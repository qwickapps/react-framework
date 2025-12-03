# Clean environment validation test for @qwickapps/react-framework
# This Dockerfile simulates a fresh project installing the package from npm/local tarball
FROM node:20-alpine

WORKDIR /app

# Copy local package tarballs (built during validation)
COPY packages/*.tgz /tmp/

# Create a new React project with Vite + TypeScript
RUN npm create vite@latest test-app -- --template react-ts && \
    cd test-app && \
    npm install

WORKDIR /app/test-app

# Install peer dependencies required by @qwickapps/react-framework
RUN npm install \
    @mui/material \
    @mui/icons-material \
    @emotion/react \
    @emotion/styled \
    react-router-dom

# Install local packages (schema first, then framework)
RUN npm install /tmp/qwickapps-schema-*.tgz /tmp/qwickapps-react-framework-*.tgz

# Copy test application file
COPY test-app.tsx ./src/App.tsx

# Build to verify TypeScript compilation and bundling work
RUN npm run build

# Success indicator
CMD ["echo", "SUCCESS: Package validated in clean environment"]
