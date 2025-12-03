/**
 * Page provides a unified Page component supporting:
 *  - Layout variants (width, padding, background)
 *  - Template-based metadata (title / description / slug)
 *  - Declarative print mode with dynamic header/footer sizing
 *  - Centralized context (route, loading/error flags, print controls)
 *  - Optional class-based extension (Page) for legacy / OOP style
 *
 * Typical usage (functional):
 *   <Page title="Orders" printConfig={{ printTitle: 'Orders' }}>
 *     <OrdersList />
 *   </Page>
 *
 * Class-based (override only what you need):
 *   class OrdersPage extends Page {
 *     protected getPageProps() { return { title: 'Orders' }; }
 *     protected renderPrintView() { return <PrintOnlyLayout />; }
 *   }
 *
 * Printing:
 *   const { triggerPrint } = usePageContext();
 *   triggerPrint(optionalOverrides);
 *
 * Copyright (c) 2025 QwickApps
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { t } from '../../contexts';
import { useBaseProps, WithBaseProps } from '../../hooks/useBaseProps';
import { usePrintMode } from '../../hooks/usePrintMode';
import { PageTemplateSchema } from '../../schemas/PageTemplateSchema';
import { PrintConfigSchema } from '../../schemas/PrintConfigSchema';
import { toCssLength } from '../../utils/cssUtils';
import { useSafeLocation } from '../../utils/reactUtils';
import { SafeSpan } from '../SafeSpan';
import './Page.css';
import { Box } from '@mui/material';

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */
export interface PageContextValue {
  route?: string;
  isPrintMode: boolean;
  printConfig: PrintConfigSchema;
  triggerPrint: (config?: Partial<PrintConfigSchema>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  isLoading: boolean;
  error: string | null;
}

const PageContext = createContext<PageContextValue | null>(null);

export const usePageContext = (): PageContextValue => {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error('usePageContext must be used within PageView');
  return ctx;
};

/* -------------------------------------------------------------------------- */
/* Meta Hook                                                                  */
/* -------------------------------------------------------------------------- */
function usePageMeta(
  title?: string,
  description?: string,
  opts?: { openGraph?: boolean; removeOnUnmount?: boolean }
) {
  const { openGraph = true, removeOnUnmount = false } = opts || {};

  useEffect(() => {
    const prevTitle = document.title;
    let createdDesc = false;
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;

    if (title && document.title !== title) {
      document.title = title;
    }

    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
        createdDesc = true;
      }
      if (metaDesc.content !== description) metaDesc.content = description;
    }

    let ogTitle: HTMLMetaElement | null = null;
    let ogDesc: HTMLMetaElement | null = null;

    if (openGraph) {
      if (title) {
        ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
          ogTitle = document.createElement('meta');
          ogTitle.setAttribute('property', 'og:title');
          document.head.appendChild(ogTitle);
        }
        if (ogTitle.content !== title) ogTitle.content = title;
      }
      if (description) {
        ogDesc = document.querySelector('meta[property="og:description"]');
        if (!ogDesc) {
          ogDesc = document.createElement('meta');
          ogDesc.setAttribute('property', 'og:description');
          document.head.appendChild(ogDesc);
        }
        if (ogDesc.content !== description) ogDesc.content = description;
      }
    }

    return () => {
      if (removeOnUnmount) {
        if (document.title === title) document.title = prevTitle;
        if (description && metaDesc && (createdDesc || removeOnUnmount)) {
          metaDesc.parentNode?.removeChild(metaDesc);
        }
        if (openGraph) {
          if (ogTitle && removeOnUnmount) ogTitle.parentNode?.removeChild(ogTitle);
          if (ogDesc && removeOnUnmount) ogDesc.parentNode?.removeChild(ogDesc);
        }
      }
    };
  }, [title, description, openGraph, removeOnUnmount]);
}

/* -------------------------------------------------------------------------- */
/* Public Props                                                               */
/* -------------------------------------------------------------------------- */
export interface PageProps extends WithBaseProps {
  route?: string;
  variant?: 'default' | 'centered' | 'narrow' | 'wide' | 'fullwidth';
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: 'default' | 'surface' | 'alternate';
  maxWidth?: 'small' | 'medium' | 'large' | 'extra-large' | 'none';
  printConfig?: Partial<PrintConfigSchema>;
  template?: PageTemplateSchema;
  title?: string;
  description?: string;
  name?: string;
  slug?: string;
  children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Internal PageView                                                          */
/* -------------------------------------------------------------------------- */
interface PageViewProps extends PageProps {
  renderView: () => React.ReactNode;
  renderPrintView: () => React.ReactNode;
}

export const PageView: React.FC<PageViewProps> = ({
  renderView,
  renderPrintView,
  template,
  route: routeProp,
  title: titleProp,
  description: descriptionProp,
  name: nameProp,
  slug: slugProp,
  printConfig: printConfigProp,
  variant = 'default',
  padding = 'medium',
  background = 'default',
  maxWidth = 'large',
  children,
  ...rest
}) => {
  // Base props (single invocation early so we can merge styles/classNames)
  const { htmlProps, styleProps } = useBaseProps(rest);

  // State exposed via context
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resolve template / prop derived metadata
  const resolved = {
    route: routeProp ?? (template?.slug ? `/${template.slug}` : undefined),
    title: titleProp ?? template?.title ?? template?.name,
    description: descriptionProp ?? template?.description,
    name: nameProp ?? template?.name,
    slug: slugProp ?? template?.slug,
    printConfig: { ...template?.printConfig, ...printConfigProp }
  };

  // Update head metadata
  usePageMeta(resolved.title, resolved.description);

  // Print integration
  const {
    isPrintMode,
    printConfig,
    onViewLoading,
    onViewReady,
    triggerPrint: triggerPrintBase
  } = usePrintMode();

  const triggerPrint = useCallback(
    (cfg?: Partial<PrintConfigSchema>) =>
      triggerPrintBase({ ...resolved.printConfig, ...cfg }),
    [triggerPrintBase, resolved.printConfig]
  );

  // Sync print readiness with loading state
  useLayoutEffect(() => {
    if (!isPrintMode) return;
    if (isLoading) onViewLoading();
    else onViewReady();
  }, [isPrintMode, isLoading, onViewLoading, onViewReady]);

  // Inject dynamic print sizing styles (header/footer heights & background)
  useEffect(() => {
    if (!isPrintMode) return;
    const styleId = 'qwickapps-print-page-setup';
    const cfg = printConfig;
    const size = (cfg as unknown as { pageSize?: string }).pageSize || 'auto';
    const bg = cfg.printBackground || 'transparent';
    const bgFirst = cfg.printBackgroundFirstPage || bg;

    const hdrEl = document.querySelector('.page-print-header:not(.page-print-header-first-page)') as HTMLElement | null;
    const ftrEl = document.querySelector('.page-print-footer:not(.page-print-footer-first-page)') as HTMLElement | null;
    const hdr = hdrEl?.getBoundingClientRect ? Math.ceil(hdrEl.getBoundingClientRect().height) : 0;
    const ftr = ftrEl?.getBoundingClientRect ? Math.ceil(ftrEl.getBoundingClientRect().height) : 0;
    const headerH = hdr ? `${hdr}px` : toCssLength(cfg.printHeaderHeight || 0);
    const footerH = ftr ? `${ftr}px` : toCssLength(cfg.printFooterHeight || 0);

    const setCss = (h: string, f: string) =>
      `@media print{@page{size:${size};margin:0;} .page-print-mode{--print-header-height:${h};--print-footer-height:${f};--print-background:${bg};--print-background-first-page:${bgFirst};}}`;

    let el = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = styleId;
      document.head.appendChild(el);
    }
    el.textContent = setCss(headerH, footerH);

    // Observe late size changes (images/fonts) while in print mode
    let ro: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => {
        const hdrNow = hdrEl?.getBoundingClientRect ? Math.ceil(hdrEl.getBoundingClientRect().height) : 0;
        const ftrNow = ftrEl?.getBoundingClientRect ? Math.ceil(ftrEl.getBoundingClientRect().height) : 0;
        const finalCss = setCss(
          hdrNow ? `${hdrNow}px` : headerH,
          ftrNow ? `${ftrNow}px` : footerH
        );
        if (el && el.textContent !== finalCss) el.textContent = finalCss;
      });
      if (hdrEl) ro.observe(hdrEl);
      if (ftrEl) ro.observe(ftrEl);
    }

    const cleanup = () => {
      const s = document.getElementById(styleId);
      if (s?.parentNode) s.parentNode.removeChild(s);
      ro?.disconnect();
    };

    window.addEventListener('afterprint', cleanup, { once: true });
    return () => {
      window.removeEventListener('afterprint', cleanup);
      cleanup();
    };
  }, [isPrintMode, printConfig]);

  // Route (fallback to current location)
  const location = useSafeLocation();
  const actualRoute = resolved.route || location?.pathname || '';

  // Context value
  const contextValue = useMemo<PageContextValue>(() => ({
    route: actualRoute,
    isPrintMode,
    printConfig,
    triggerPrint,
    setLoading,
    setError,
    isLoading,
    error
  }), [actualRoute, isPrintMode, printConfig, triggerPrint, isLoading, error]);

  const classes = [
    'page',
    `page-variant-${variant}`,
    `page-padding-${padding}`,
    `page-background-${background}`,
    `page-max-width-${maxWidth}`,
    isPrintMode && 'page-print-mode',
    isPrintMode && printConfig.pageMargins === '0mm' && 'page-print-borderless',
    isPrintMode && printConfig.pageMargins === '6mm' && 'page-print-compact',
    isPrintMode && printConfig.pageMargins === '20mm' && 'page-print-large',
    isPrintMode && printConfig.pageMargins === '25mm' && 'page-print-formal',
    isPrintMode && (printConfig.printBackground || printConfig.printBackgroundFirstPage) && 'has-background',
    styleProps.className
  ].filter(Boolean).join(' ');

  // Resolve mode-specific render output (avoid falsey fallback for '')
  const rendered = (isPrintMode ? renderPrintView : renderView)();
  const mainContent = rendered != null ? rendered : children;

  return (
    <PageContext.Provider value={contextValue}>
      <Box className={classes} sx={styleProps.sx} style={styleProps.style} {...htmlProps}>
        {isPrintMode && printConfig.printHeader && (
          <div className="page-print-header">
            {typeof printConfig.printHeader === 'string'
              ? <SafeSpan html={t`${printConfig.printHeader}` as string} />
              : printConfig.printHeader}
          </div>
        )}
        {isPrintMode && printConfig.printHeaderFirstPage && (
            <div className="page-print-header page-print-header-first-page">
              {typeof printConfig.printHeaderFirstPage === 'string'
                ? <SafeSpan html={t`${printConfig.printHeaderFirstPage}` as string} />
                : printConfig.printHeaderFirstPage}
            </div>
        )}
        {isPrintMode && !printConfig.printHeader && printConfig.printTitle && (
          <div className="page-print-header">
            <h1>{printConfig.printTitle}</h1>
            {printConfig.showPrintDate && (
              <div className="page-print-date">
                Printed on: {new Date().toLocaleString()}
              </div>
            )}
          </div>
        )}
        {resolved.name && resolved.name !== resolved.title && (
          <div className="page-heading">
            <h1>{resolved.name}</h1>
          </div>
        )}
        <div className="page-content">
          {mainContent}
        </div>
        {isPrintMode && printConfig.printFooter && (
          <div className="page-print-footer">
            {typeof printConfig.printFooter === 'string'
              ? <SafeSpan html={t`${printConfig.printFooter}` as string} />
              : printConfig.printFooter}
          </div>
        )}
        {isPrintMode && printConfig.printFooterFirstPage && (
          <div className="page-print-footer page-print-footer-first-page">
            {typeof printConfig.printFooterFirstPage === 'string'
              ? <SafeSpan html={t`${printConfig.printFooterFirstPage}` as string} />
              : printConfig.printFooterFirstPage}
          </div>
        )}
      </Box>
    </PageContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/* Page Class                                                                 */
/* -------------------------------------------------------------------------- */
export class Page<P extends PageProps = PageProps, S = Record<string, never>> extends React.Component<P, S> {
  protected getPageProps(): Partial<PageProps> { return {}; }
  protected renderView(): React.ReactNode { return this.props.children; }
  protected renderPrintView(): React.ReactNode { return this.renderView(); }

  render() {
    const merged: PageProps = {
      ...(this.props as PageProps),
      ...(this.getPageProps() as PageProps)
    };
    return (
      <PageView
        {...merged}
        renderView={() => this.renderView()}
        renderPrintView={() => this.renderPrintView()}
      />
    );
  }
}

export default Page;