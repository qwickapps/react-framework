/**
 * Captcha - Universal CAPTCHA component supporting multiple providers
 *
 * Supported providers:
 * - Google reCAPTCHA v2 (checkbox)
 * - Google reCAPTCHA v3 (invisible)
 * - hCaptcha
 * - Cloudflare Turnstile
 *
 * Features:
 * - Provider-agnostic API
 * - Automatic script loading
 * - TypeScript support
 * - Themed styling with base props support
 * - Grid behavior support
 * - Error handling
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box, Alert } from '@mui/material';
import { useBaseProps, WithBaseProps, QWICKAPP_COMPONENT } from '../../hooks/useBaseProps';

export type CaptchaProvider = 'recaptcha-v2' | 'recaptcha-v3' | 'hcaptcha' | 'turnstile';

interface CaptchaBaseProps {
  /** CAPTCHA provider */
  provider: CaptchaProvider;
  /** Site key (public key) */
  siteKey: string;
  /** Callback when CAPTCHA is successfully completed */
  onVerify: (token: string) => void;
  /** Callback when CAPTCHA expires or fails */
  onExpire?: () => void;
  /** Callback when CAPTCHA encounters an error */
  onError?: (error: Error) => void;
  /** Theme for the widget (light or dark) */
  theme?: 'light' | 'dark';
  /** Size of the widget */
  size?: 'normal' | 'compact' | 'invisible';
  /** reCAPTCHA v3 action name */
  action?: string;
}

export interface CaptchaProps extends WithBaseProps<CaptchaBaseProps> {}

// Declare global interfaces for CAPTCHA providers
declare global {
  interface Window {
    grecaptcha?: unknown;
    hcaptcha?: unknown;
    turnstile?: unknown;
    onRecaptchaLoad?: () => void;
    onHcaptchaLoad?: () => void;
    onTurnstileLoad?: () => void;
  }
}

export const Captcha = React.forwardRef<HTMLDivElement, CaptchaProps>((props, ref) => {
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(props);

  const {
    provider,
    siteKey,
    onVerify,
    onExpire,
    onError,
    theme = 'light',
    size = 'normal',
    action = 'submit',
  } = restProps as CaptchaBaseProps;

  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load the appropriate CAPTCHA script
  useEffect(() => {
    const loadScript = () => {
      // Check if script is already loaded
      const isAlreadyLoaded = (() => {
        switch (provider) {
          case 'recaptcha-v2':
          case 'recaptcha-v3':
            return !!window.grecaptcha;
          case 'hcaptcha':
            return !!window.hcaptcha;
          case 'turnstile':
            return !!window.turnstile;
          default:
            return false;
        }
      })();

      if (isAlreadyLoaded) {
        setIsLoaded(true);
        return;
      }

      // Get the script URL for the provider
      const getScriptUrl = (): string => {
        switch (provider) {
          case 'recaptcha-v2':
            return 'https://www.google.com/recaptcha/api.js?render=explicit';
          case 'recaptcha-v3':
            return `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
          case 'hcaptcha':
            return 'https://js.hcaptcha.com/1/api.js?render=explicit';
          case 'turnstile':
            return 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
          default:
            return '';
        }
      };

      const scriptUrl = getScriptUrl();
      if (!scriptUrl) {
        setError('Unsupported CAPTCHA provider');
        return;
      }

      // Create and load script
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        setError('Failed to load CAPTCHA script');
        onError?.(new Error('Failed to load CAPTCHA script'));
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup: remove script when component unmounts
        document.head.removeChild(script);
      };
    };

    loadScript();
  }, [provider, siteKey, onError]);

  // Render the CAPTCHA widget
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const renderWidget = () => {
      try {
        switch (provider) {
          case 'recaptcha-v2':
            if (window.grecaptcha && window.grecaptcha.render) {
              widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
                sitekey: siteKey,
                callback: onVerify,
                'expired-callback': onExpire,
                'error-callback': () => {
                  const err = new Error('reCAPTCHA error');
                  setError(err.message);
                  onError?.(err);
                },
                theme,
                size,
              });
            }
            break;

          case 'recaptcha-v3':
            // reCAPTCHA v3 is invisible and executes programmatically
            if (window.grecaptcha && window.grecaptcha.execute) {
              window.grecaptcha.execute(siteKey, { action }).then((token: string) => {
                onVerify(token);
              }).catch((err: Error) => {
                setError(err.message);
                onError?.(err);
              });
            }
            break;

          case 'hcaptcha':
            if (window.hcaptcha && window.hcaptcha.render) {
              widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
                sitekey: siteKey,
                callback: onVerify,
                'expired-callback': onExpire,
                'error-callback': () => {
                  const err = new Error('hCaptcha error');
                  setError(err.message);
                  onError?.(err);
                },
                theme,
                size: size === 'normal' ? 'normal' : 'compact',
              });
            }
            break;

          case 'turnstile':
            if (window.turnstile && window.turnstile.render) {
              widgetIdRef.current = window.turnstile.render(containerRef.current, {
                sitekey: siteKey,
                callback: onVerify,
                'expired-callback': onExpire,
                'error-callback': () => {
                  const err = new Error('Turnstile error');
                  setError(err.message);
                  onError?.(err);
                },
                theme,
                size: size === 'compact' ? 'compact' : 'normal',
              });
            }
            break;
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to render CAPTCHA');
        setError(error.message);
        onError?.(error);
      }
    };

    // Small delay to ensure the CAPTCHA library is fully initialized
    const timer = setTimeout(renderWidget, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup widget on unmount
      if (widgetIdRef.current !== null) {
        try {
          switch (provider) {
            case 'recaptcha-v2':
              window.grecaptcha?.reset(widgetIdRef.current);
              break;
            case 'hcaptcha':
              window.hcaptcha?.remove(widgetIdRef.current);
              break;
            case 'turnstile':
              window.turnstile?.remove(widgetIdRef.current);
              break;
          }
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [isLoaded, provider, siteKey, onVerify, onExpire, onError, theme, size, action]);

  // Don't render anything for reCAPTCHA v3 (invisible)
  if (provider === 'recaptcha-v3') {
    return null;
  }

  return (
    <Box
      ref={ref}
      {...htmlProps}
      sx={{
        my: 2,
        ...styleProps.sx,
      }}
      // Store grid props as data attributes for ColumnLayout to pick up
      {...(gridProps && {
        'data-grid-span': gridProps.span,
        'data-grid-xs': gridProps.xs,
        'data-grid-sm': gridProps.sm,
        'data-grid-md': gridProps.md,
        'data-grid-lg': gridProps.lg,
        'data-grid-xl': gridProps.xl,
      })}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <div ref={containerRef} />
    </Box>
  );
});

Captcha.displayName = 'Captcha';

// Mark as QwickApp component
Object.assign(Captcha, { [QWICKAPP_COMPONENT]: true });

export default Captcha;
