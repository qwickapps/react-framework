# CI and npm publishing

This repository currently publishes with `.github/workflows/publish.yml`. It is a release workflow, not a pull-request CI workflow: it runs after qualifying pushes to `main` and when someone deliberately starts it from the Actions page.

## When the workflow runs

The workflow starts automatically when a push to `main` changes either:

- `package.json`
- `src/**`

It can also be started with **Run workflow** from GitHub Actions. Changes outside those paths do not start it automatically. Pull requests do not run this workflow and never publish through it.

## What the publish job does

The single `publish` job runs on the self-hosted `macmini` runner. It:

1. checks out the commit;
2. configures Node.js 20 and the public npm registry;
3. installs dependencies with `npm install --legacy-peer-deps`;
4. skips `npm run build` when a `dist`, `dist-ui`, or `dist-ui-lib` directory is already present; otherwise it builds from source;
5. runs `npm run validate` only when `package.json` defines that script;
6. compares the `package.json` version with the version currently published to npm;
7. exits without publishing if the versions match; otherwise publishes with `npm publish --access public --ignore-scripts`; and
8. creates a GitHub release tagged `v<package-version>` after a successful publish.

The workflow uses the repository `NPM_TOKEN` secret for npm authentication. Do not add a token or an auth-bearing `.npmrc` to the repository. The job creates an ephemeral, job-local npm configuration and removes it after publishing.

## Run equivalent checks locally

Use the same install mode and build command before opening a release pull request:

```bash
npm install --legacy-peer-deps
npm run build
npm test
npm pack --dry-run --ignore-scripts
```

`npm pack --dry-run` prints the files that would be included in the package. Confirm the package contains the expected build outputs before changing a release version.

To compare the local package version with npm:

```bash
node -p "require('./package.json').name"
node -p "require('./package.json').version"
npm view "$(node -p "require('./package.json').name")" version
```

Do not run a local `npm publish` for a normal release. Merge the version change to `main`, or intentionally dispatch the workflow, so the repository release and npm publication stay aligned.

## Release checklist

1. Update `package.json` to a version that is not already published.
2. Run the local checks above and inspect the `npm pack --dry-run` output.
3. Open and review a pull request. This workflow does not verify pull requests, so use the repository's applicable review and test process.
4. Merge the qualifying version or source change to `main`, or dispatch **Publish to npm** manually when appropriate.
5. Confirm the `publish` job succeeds, the GitHub release has the expected `v<version>` tag, and npm reports the expected version.

## Finding workflow logs

In GitHub, open the repository's **Actions** tab, select **Publish to npm**, then open the relevant run, job, and failed step.

With GitHub CLI, list recent runs and inspect failed logs:

```bash
gh run list --workflow publish.yml --limit 10
gh run view <run-id> --log-failed
```

For a successful release, record the workflow URL, commit SHA, GitHub release URL, and published package version in the pull-request or release discussion.
