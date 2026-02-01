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
 * - Themed styling with schema-driven architecture
 * - Grid behavior support
 * - Error handling
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Box, Alert } from '@mui/material';
import type { SchemaProps } from '@qwickapps/schema';
import CaptchaModel from '../../schemas/CaptchaSchema';
import { ViewProps } from '../shared/viewProps';
import { createSerializableView, SerializableComponent } from '../shared/createSerializableView';

// Declare global interfaces for CAPTCHA providers
declare global {
  interface Window {
    grecaptcha?: {
      render?: (container: HTMLElement | null, params: Record<string, unknown>) => string | number;
      execute?: (siteKey: string, options: { action: string }) => Promise<string>;
      reset?: (widgetId: string | number) => void;
    };
    hcaptcha?: {
      render?: (container: HTMLElement | null, params: Record<string, unknown>) => string | number;
      remove?: (widgetId: string | number) => void;
    };
    turnstile?: {
      render?: (container: HTMLElement | null, params: Record<string, unknown>) => string | number;
      remove?: (widgetId: string | number) => void;
    };
  }
}

/**
 * Props interface for Captcha component
 * Combines schema props with callback handlers
 */
export interface CaptchaProps extends ViewProps, SchemaProps<typeof CaptchaModel> {
  /** Callback when CAPTCHA is successfully completed */
  onVerify: (token: string) => void;
  /** Callback when CAPTCHA expires or fails */
  onExpire?: () => void;
  /** Callback when CAPTCHA encounters an error */
  onError?: (error: Error) => void;
}

/**
 * CaptchaView - Pure view component that renders the CAPTCHA widget
 */
function CaptchaView({
  provider,
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal',
  action = 'submit',
  ...restProps
}: CaptchaProps) {
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
            if (window.grecaptcha?.render) {
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
            if (window.grecaptcha?.execute) {
              window.grecaptcha.execute(siteKey, { action }).then((token: string) => {
                onVerify(token);
              }).catch((err: Error) => {
                setError(err.message);
                onError?.(err);
              });
            }
            break;

          case 'hcaptcha':
            if (window.hcaptcha?.render) {
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
            if (window.turnstile?.render) {
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
      {...restProps}
      sx={{
        my: 2,
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <div ref={containerRef} />
    </Box>
  );
}

/**
 * Create Captcha component using the factory pattern
 */
export const Captcha: SerializableComponent<CaptchaProps> = createSerializableView<CaptchaProps>({
  tagName: 'Captcha',
  version: '1.0.0',
  role: 'input',
  View: CaptchaView,
});

export default Captcha;
