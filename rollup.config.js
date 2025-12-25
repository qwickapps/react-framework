import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

// Check if we should strip logs completely
const stripLogs = process.env.STRIP_LOGS === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export default [
  // Main framework build
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'named',
        banner: "'use client';"
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        exports: 'named',
        banner: "'use client';"
      }
    ],
  external: (id) => {
    // Externalize all React-related imports
    if (id.startsWith('react') || id.startsWith('react/')) {
      return true;
    }
    // Externalize all MUI imports
    if (id.startsWith('@mui/')) {
      return true;
    }
    // Externalize all Emotion imports
    if (id.startsWith('@emotion/')) {
      return true;
    }
    // Externalize the logging package
    if (id.startsWith('@qwickapps/logging')) {
      return true;
    }
    // Externalize QwickApps schema package
    if (id.startsWith('@qwickapps/schema')) {
      return true;
    }
    // Externalize class-transformer and class-validator
    if (id.startsWith('class-transformer') || id.startsWith('class-validator')) {
      return true;
    }
    // Externalize reflect-metadata
    if (id === 'reflect-metadata') {
      return true;
    }
    return false;
  },
  onwarn(warning, warn) {
    // Suppress "use client" directive warnings from MUI
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
      return;
    }
    // Suppress "this" rewrite warnings from class-transformer/class-validator
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    // Suppress unresolved dependency warnings for externalized packages
    if (warning.code === 'UNRESOLVED_IMPORT') {
      const external = ['@qwickapps/schema', 'class-transformer', 'class-validator', 'reflect-metadata'];
      if (external.some(pkg => warning.source?.startsWith(pkg))) {
        return;
      }
    }
    // Use default for everything else
    warn(warning);
  },
  plugins: [
    // Replace environment variables
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        // When STRIP_LOGS is true, set a flag that can be checked at runtime
        'process.env.STRIP_LOGS': JSON.stringify(stripLogs ? 'true' : 'false')
      }
    }),
    babel({
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**'
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
      noEmitOnError: false,
      compilerOptions: {
        declarationDir: 'dist',
        rootDir: 'src'
      }
    }),
    postcss({
      extract: true,
      minimize: true
    })
  ]
  },
  
  // Config-only build (lightweight for build tools)
  {
    input: 'src/config.ts',
    output: [
      {
        file: 'dist/config.js',
        format: 'cjs',
        exports: 'named'
      },
      {
        file: 'dist/config.esm.js',
        format: 'esm',
        exports: 'named'
      }
    ],
    external: (id) => {
      // This build should be completely standalone with no external dependencies
      // Only externalize Node.js built-ins
      return false;
    },
    onwarn(warning, warn) {
      // Suppress "use client" directive warnings
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return;
      }
      // Use default for everything else
      warn(warning);
    },
    plugins: [
      // Replace environment variables
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }
      }),
      babel({
        babelHelpers: 'bundled',
        include: ['src/**/*'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**'
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
        noEmitOnError: false,
        compilerOptions: {
          declarationDir: 'dist',
          rootDir: 'src'
        }
      })
    ]
  }
];
