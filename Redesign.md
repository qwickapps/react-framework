# QwickApps React Framework Architecture (Schema-driven, No Legacy)

Status: Proposed
Scope: Replace wrappers/classes with functional, schema-driven, serializable components. No backward compatibility or fallbacks.

## Goals

- Single source of truth for View/Container props derived from ViewSchema.
- One factory to create serializable components with uniform toJson/fromJson.
- Centralized normalization of schema props (JSON parsing, events, grid coercion).
- Strict ComponentTransformer that only handles registered components.
- No wrappers, aliases, or ModelView subclasses.
- Tests and stories updated to new patterns.

Non-goals

- Backward compatibility with ModelView or ReactNodeTransformer.
- Heuristics for unregistered components or “best-effort” fallbacks.

---

## High-level Design

- ViewSchema remains the authoritative contract for all base props (grid, spacing, styling, a11y, events).
- ViewProps is derived from SchemaProps<ViewSchema> with runtime normalization in one shared utility.
- Components are functional “Views” created via a factory:
  - Normalizes schema props.
  - Applies base props processing once (useBaseProps).
  - Offers a single place to integrate data binding (optional).
  - Provides static tagName/version/fromJson/toJson for serialization.
- ComponentTransformer:
  - Serializes/deserializes only registered components.
  - Throws on unknown nodes.
- Pattern registry:
  - For HTML-to-component import transforms (e.g., <p> → Text).
  - Not used for wrapper/alias resolution (we have no wrappers).

---

## Core Concepts

1) ViewSchema and ViewProps
- ViewSchema defines the validated shape of base props for all components.
- ViewProps = SchemaProps<ViewSchema> + runtime-friendly fields (sx, style as JSON/string; event handlers as string/fn).
- We normalize ViewProps in one place.

2) Normalization of schema props
- Parse JSON-like fields (sx, style).
- Convert stringified event handlers to functions.
- Coerce grid span/breakpoints from strings to numbers or known keywords (auto, grow).

3) Serializable component factory
- Small helper that builds a functional component and attaches static serialization metadata and methods.
- Ensures consistent handling of props, children, serialization across all components.
- Optional finalize hook if a view needs to massage props post-processing.

4) ComponentTransformer (strict)
- Only serializes/deserializes registered components.
- No alias resolution, no ReactNode fallback.
- Children can be primitives, arrays, or other registered components.

5) Component Registry
- Single module that registers all serializable components at startup (side effect import).
- Components may also register HTML pattern handlers for importers/editors.

---

## Reference Implementation

Add these files (or replace existing ones). Code is illustrative and production-ready for this architecture.

1) Shared View props normalization

```ts
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/components/shared/viewProps.ts
import type { SchemaProps } from '@qwickapps/schema';
import type { SxProps, Theme } from '@mui/material/styles';
import type { FocusEventHandler, MouseEventHandler } from 'react';
import ViewSchema from '../../schemas/ViewSchema';

export type ViewProps = SchemaProps<ViewSchema> & {
  sx?: SxProps<Theme> | string;
  style?: React.CSSProperties | string;
  onClick?: string | MouseEventHandler<any>;
  onMouseEnter?: string | MouseEventHandler<any>;
  onMouseLeave?: string | MouseEventHandler<any>;
  onFocus?: string | FocusEventHandler<any>;
  onBlur?: string | FocusEventHandler<any>;
};

export function parseJSON<T>(value?: string | T): T | undefined {
  if (typeof value !== 'string') return value as T | undefined;
  try { return JSON.parse(value) as T; } catch { return undefined; }
}

export function convertEventHandler<T extends (...args: any[]) => any>(handler?: string | T): T | undefined {
  if (typeof handler !== 'string') return handler;
  try {
    const func = new Function('event', `
      try {
        ${handler.trim().startsWith('function') ? `return (${handler})(event)` : handler}
      } catch (error) { console.error('Error executing event handler:', error); }
    `);
    return ((...args: any[]) => func(args[0])) as T;
  } catch {
    return undefined;
  }
}

export function normalizeViewProps<T extends ViewProps>(schema: Partial<T>): T {
  const {
    sx, style, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur,
    span, xs, sm, md, lg, xl, ...rest
  } = (schema || {}) as ViewProps;

  const toIntOrKeyword = (v: any, keywords: string[] = []) =>
    v === undefined ? undefined :
    typeof v === 'string' && keywords.includes(v) ? v :
    typeof v === 'string' ? (Number.isNaN(parseInt(v, 10)) ? v : parseInt(v, 10)) :
    v;

  return {
    ...(rest as any),
    span: toIntOrKeyword(span, ['auto', 'grow']) as any,
    xs: toIntOrKeyword(xs, ['auto']) as any,
    sm: toIntOrKeyword(sm, ['auto']) as any,
    md: toIntOrKeyword(md, ['auto']) as any,
    lg: toIntOrKeyword(lg, ['auto']) as any,
    xl: toIntOrKeyword(xl, ['auto']) as any,
    sx: parseJSON(sx),
    style: parseJSON(style),
    onClick: convertEventHandler(onClick),
    onMouseEnter: convertEventHandler(onMouseEnter),
    onMouseLeave: convertEventHandler(onMouseLeave),
    onFocus: convertEventHandler(onFocus),
    onBlur: convertEventHandler(onBlur),
  } as T;
}
```

2) Factory for serializable functional Views/Containers

```tsx
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/components/shared/createSerializableView.tsx
import React, { useMemo } from 'react';
import type { ReactElement } from 'react';
import type { WithDataBinding } from '@qwickapps/schema';
import { ComponentTransformer } from '../../schemas/transformers/ComponentTransformer';
import { useBaseProps } from '../../hooks';
import { normalizeViewProps, ViewProps } from './viewProps';

type Role = 'view' | 'container';

type Options<P> = {
  tagName: string;
  version: string;
  role: Role;
  View: React.ComponentType<P>;
  finalize?: (props: P) => P;
};

export function createSerializableView<P extends ViewProps & WithDataBinding>(
  opts: Options<P>
) {
  const { tagName, version, role, View, finalize } = opts;

  function Component(rawProps: P): ReactElement {
    const { children, dataSource, bindingOptions, ...schemaProps } = rawProps as any;

    // Normalize all ViewSchema props
    const normalized = useMemo(() => normalizeViewProps(schemaProps), [schemaProps]);

    // TODO: integrate useDataBinding here when ready (must tolerate undefined; use enabled: !!dataSource)
    const bound = normalized;

    // Compute base props once for all components
    const { styleProps, htmlProps, gridProps, restProps } = useBaseProps(bound as any);

    const merged = { ...(htmlProps as any), ...(styleProps as any), ...(restProps as any) } as P;
    const viewProps = finalize ? finalize(merged) : merged;

    const maybeGrid = role === 'container' && gridProps ? { 'data-grid': JSON.stringify(gridProps) } : undefined;

    return React.createElement(
      View as any,
      { ...(viewProps as any), ...maybeGrid },
      children
    );
  }

  // Static serialization metadata
  (Component as any).tagName = tagName;
  (Component as any).version = version;

  (Component as any).fromJson = (jsonData: any) => {
    const { tagName: t, version: v, data } = jsonData || {};
    if (t !== tagName) throw new Error(`Cannot deserialize: Expected tagName '${tagName}' but got '${t}'`);
    if (v !== version) console.warn(`Version mismatch: Expected ${version} but got ${v}`);
    const { children, ...props } = data || {};
    return React.createElement(Component as any, props, ComponentTransformer.deserialize(children));
  };

  (Component as any).toJson = (props: P) => {
    const { children, ...schemaProps } = (props as any) || {};
    return {
      tagName,
      version,
      data: {
        ...schemaProps,
        children: ComponentTransformer.serialize(children),
      }
    };
  };

  return Component;
}
```

3) Strict ComponentTransformer (no legacy fallback)

```ts
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/schemas/transformers/ComponentTransformer.ts
import React, { ReactElement, ReactNode, isValidElement } from 'react';

export type SerializableConstructor = {
  tagName: string;
  version: string;
  fromJson: (json: any) => ReactElement;
  toJson?: (props: any) => any;
};

const componentRegistry = new Map<string, SerializableConstructor>();
const patternRegistry = new Map<string, (el: Element) => any>();

export class ComponentTransformer {
  static registerComponent(componentFn: SerializableConstructor) {
    const { tagName, version, fromJson } = componentFn as any;
    if (!tagName || !version || typeof fromJson !== 'function') {
      throw new Error('Serializable components must define static tagName, version, and fromJson');
    }
    componentRegistry.set(tagName, componentFn);
  }

  static registerPattern(tag: string, handler: (el: Element) => any) {
    patternRegistry.set(tag, handler);
  }

  static hasPattern(tag: string) {
    return patternRegistry.has(tag);
  }

  static serialize(node: ReactNode): any {
    if (node == null) return null;
    if (Array.isArray(node)) return node.map(n => ComponentTransformer.serialize(n));
    if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') return node;

    if (isValidElement(node)) {
      const element = node as ReactElement;
      const type: any = element.type;
      const tagName = (type as any).tagName;
      if (!tagName || !componentRegistry.has(tagName)) {
        const name = type?.displayName || type?.name || 'Unknown';
        throw new Error(`Unregistered component in tree: ${name}`);
      }

      if (typeof (type as any).toJson === 'function') {
        return (type as any).toJson(element.props);
      }

      const { children, ...rest } = element.props || {};
      const version = (type as any).version || '1.0.0';
      return {
        tagName,
        version,
        data: {
          ...rest,
          children: ComponentTransformer.serialize(children),
        },
      };
    }

    throw new Error(`Unsupported node type during serialization: ${String(node)}`);
  }

  static deserialize(input: any): ReactNode | ReactNode[] {
    if (input == null) return null;
    if (Array.isArray(input)) return input.map(item => ComponentTransformer.deserialize(item));
    if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') return input;

    if (typeof input === 'object' && input.tagName && input.version) {
      const ctor = componentRegistry.get(input.tagName);
      if (!ctor) throw new Error(`Unknown component tag '${input.tagName}'`);
      return ctor.fromJson(input);
    }

    throw new Error('Invalid serialized input');
  }

  // Optional: DOM → Component schema via pattern handlers (for importers/editors)
  static transformHtmlElement(el: Element): any {
    const tag = el.tagName.toLowerCase();
    const handler = patternRegistry.get(tag);
    if (!handler) throw new Error(`No pattern handler registered for <${tag}>`);
    return handler(el);
  }
}
```

4) Registry (register serializable components once)

```ts
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/schemas/transformers/registry.ts
import { ComponentTransformer } from './ComponentTransformer';
import Container from '../../components/base/Container';
import Text from '../../components/blocks/Text';
import Code from '../../components/blocks/Code';

export function registerSerializableComponents(): void {
  ComponentTransformer.registerComponent(Container as any);
  ComponentTransformer.registerComponent(Text as any);
  ComponentTransformer.registerComponent(Code as any);

  // Optional: allow components to register HTML patterns
  if (typeof (Text as any).registerPatternHandlers === 'function') {
    (Text as any).registerPatternHandlers({
      hasPattern: (k: string) => ComponentTransformer.hasPattern(k),
      registerPattern: (k: string, fn: any) => ComponentTransformer.registerPattern(k, fn),
    });
  }
}

// Auto-register on import
registerSerializableComponents();
```

5) Container (factory-based)

```tsx
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/components/base/Container.tsx
import React from 'react';
import { Box } from '@mui/material';
import type { WithDataBinding } from '@qwickapps/schema';
import { createSerializableView } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export type ContainerProps = ViewProps & WithDataBinding;

function ContainerView({ children, ...rest }: React.PropsWithChildren<ContainerProps>) {
  return (
    <Box component="div" {...(rest as any)}>
      {children}
    </Box>
  );
}

export const Container = createSerializableView<ContainerProps>({
  tagName: 'Container',
  version: '1.0.0',
  role: 'container',
  View: ContainerView
});

export default Container;
```

6) Text (factory-based, no wrappers)

```tsx
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/components/blocks/Text.tsx
import React from 'react';
import { Typography } from '@mui/material';
import type { WithDataBinding } from '@qwickapps/schema';
import { createSerializableView } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export type TextProps = ViewProps & WithDataBinding & {
  content?: string;
  variant?: any;
  color?: any;
  align?: any;
  component?: React.ElementType;
  noWrap?: boolean;
  gutterBottom?: boolean;
};

function TextView({ content, children, ...rest }: React.PropsWithChildren<TextProps>) {
  return (
    <Typography {...(rest as any)}>
      {content ?? children}
    </Typography>
  );
}

export const Text = createSerializableView<TextProps>({
  tagName: 'Text',
  version: '1.0.0',
  role: 'view',
  View: TextView
});

// Optional: HTML import patterns
(Text as any).registerPatternHandlers = (registry: any) => {
  const reg = (t: string, fn: (el: Element) => any) => registry.registerPattern(t, fn);

  if (!registry.hasPattern?.('p')) reg('p', (el) => ({
    tagName: 'Text',
    version: '1.0.0',
    data: { variant: 'body1', component: 'p', children: el.textContent || '' }
  }));

  ['h1','h2','h3','h4','h5','h6'].forEach(h => {
    if (!registry.hasPattern?.(h)) reg(h, (el) => ({
      tagName: 'Text',
      version: '1.0.0',
      data: { variant: h, component: h, children: el.textContent || '' }
    }));
  });

  if (!registry.hasPattern?.('span')) reg('span', (el) => ({
    tagName: 'Text',
    version: '1.0.0',
    data: { variant: 'body2', component: 'span', children: el.textContent || '' }
  }));
};

export default Text;
```

7) Code (factory-based)

```tsx
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/components/blocks/Code.tsx
import React from 'react';
import { Box } from '@mui/material';
import type { WithDataBinding } from '@qwickapps/schema';
import { createSerializableView } from '../shared/createSerializableView';
import { ViewProps } from '../shared/viewProps';

export type CodeProps = ViewProps & WithDataBinding & {
  language?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  title?: string;
  codeBackground?: string;
  children?: string;
};

function CodeView({ children = '', title, codeBackground, ...rest }: React.PropsWithChildren<CodeProps>) {
  return (
    <Box component="pre" sx={{ p: 2, overflow: 'auto', bgcolor: codeBackground || 'grey.100' }} {...(rest as any)}>
      {title ? <Box component="div" sx={{ fontWeight: 600, mb: 1 }}>{title}</Box> : null}
      <code>{children}</code>
    </Box>
  );
}

export const Code = createSerializableView<CodeProps>({
  tagName: 'Code',
  version: '1.0.0',
  role: 'view',
  View: CodeView
});

export default Code;
```

8) Ensure registry is loaded (framework entry)

```ts
// filepath: /Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src/components/index.ts
// ...existing exports...
import '../schemas/transformers/registry'; // auto-register serializable components
```

---

## Migration Plan (No Backward Compatibility)

A) Core
- Add shared utilities:
  - components/shared/viewProps.ts
  - components/shared/createSerializableView.tsx
- Replace schemas/transformers/ComponentTransformer.ts with strict version above.
- Update schemas/transformers/registry.ts to register new components and pattern handlers.
- Import registry once in components/index.ts (or the main framework entry).

B) Components
- Refactor Container, Text, Code to factory pattern (examples above).
- Repeat for remaining components (Section, Image, Button, etc.) using the same pattern.

C) Remove Legacy
- Delete components/base/ModelView.tsx and subclasses.
- Delete schemas/transformers/ReactNodeTransformer.ts.
- Remove alias resolution and findTagNameForComponent logic.
- Remove any per-component wrappers (e.g., TextWithDataBinding).

D) Unit Tests
- Update tests:
  - Serialize/deserialize round-trip for Container/Text/Code.
  - Unknown/unregistered components throw during serialize/deserialize.
  - Event handler string parsing executes without crashing.
  - Grid span/breakpoint coercion works for numbers and keywords.
  - Pattern handlers transform basic HTML to Text schema.
- Delete or replace:
  - Tests for ModelView, wrapper/alias logic, ReactNodeTransformer fallbacks.

E) Storybook
- Update stories to use new functional components and schema props.
- Remove ModelView-specific stories.
- Keep or add stories that demonstrate serialization round-trip where relevant.

F) Docs (tracked separately)
- Document:
  - How to create a new component with the factory.
  - ViewSchema fields and normalization.
  - Serialization contract and registry usage.
  - Pattern handlers for HTML import.

---

## Testing Strategy

- Unit tests (Jest/RTL):
  - Factory component static metadata (tagName/version) present.
  - ComponentTransformer.serialize throws on unknown elements and passes registered ones.
  - Round-trip: props → serialize → deserialize → props for Container/Text/Code.
  - normalizeViewProps tests:
    - sx/style JSON strings parsed.
    - event handler strings converted to functions.
    - span/xs/sm/md/lg/xl coercion.
- Storybook smoke tests (if applicable).

---

## Performance and Bundling

- Only register your own serializable components (Container, Text, Code, etc.).
- Do not auto-register MUI components; they are used internally within Views, not serialized. This keeps bundle size minimal and tree-shakable.
- Normalization is lightweight and memoized per-props.

---

## TODO Checklist

Core
- [ ] Add viewProps.ts
- [ ] Add createSerializableView.tsx
- [ ] Replace ComponentTransformer.ts (strict)
- [ ] Update registry.ts and import it in the framework entry

Components
- [ ] Refactor Container
- [ ] Refactor Text
- [ ] Refactor Code
- [ ] Plan refactor for remaining components to the factory pattern

Cleanup
- [ ] Remove ModelView.tsx and subclasses
- [ ] Remove ReactNodeTransformer.ts
- [ ] Remove alias/wrapper logic

Tests
- [ ] Update unit tests for new architecture
- [ ] Remove legacy tests
- [ ] Add round-trip, normalization, and pattern tests

Stories
- [ ] Update Container/Text/Code stories
- [ ] Remove ModelView stories
- [ ] Verify stories still render and interact correctly

---

## Notes and Conventions

- Each serializable component must export a function with static fields:
  - tagName: string
  - version: string
  - fromJson(json): ReactElement
  - toJson?(props): { tagName, version, data }
- Prefer using the factory to attach these statics and ensure consistent behavior.
- If you need per-component prop massage, use the factory finalize hook instead of wrappers.
- If you later add data binding, modify only the factory; components