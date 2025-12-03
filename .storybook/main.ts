import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    // Add TypeScript support
    config.module?.rules?.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    // Remove existing CSS rule and add our own
    if (config.module?.rules) {
      // Filter out existing CSS rules
      config.module.rules = config.module.rules.filter((rule) => {
        if (typeof rule === 'object' && rule && 'test' in rule) {
          return !rule.test || !(rule.test instanceof RegExp && rule.test.test('.css'));
        }
        return true;
      });

      // Add our CSS rule
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      });
    }

    // Resolve extensions
    config.resolve = config.resolve || {};
    config.resolve.extensions = [
      ...((config.resolve.extensions as string[]) || []),
      '.ts',
      '.tsx',
    ];

    // Add fallbacks for Node.js modules not available in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      os: false,
      path: false,
      fs: false,
    };

    return config;
  },
};
export default config;