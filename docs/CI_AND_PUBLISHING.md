# CI and npm publishing

This repository uses `.github/workflows/publish.yml` for both package verification and npm publication. The workflow is designed to validate pull requests without publishing, then publish from `main` or a deliberate manual dispatch.

## Workflow behavior

The workflow runs when these files change:

- `package.json`
- `src/**`
- `scripts/**`
- `rollup.config.*`
- `.github/workflows/publish.yml`

It also supports `workflow_dispatch` for an intentional manual run.

### Verify job

Every pull request that changes a matching path runs `verify` on `ubuntu-latest`. It:

1. checks out the repository;
2. sets up Node.js 24 and npm 11.5.1 or newer;
3. installs dependencies with `npm install --legacy-peer-deps`;
4. runs `npm run build`.

A pull request never publishes a package. A successful `verify` job is required before the publish job can run.

### Publish job

For a push to `main` or a manual dispatch, `publish` runs after `verify` succeeds. It repeats the install and build, confirms that the packed archive contains the required `dist` entry points, and compares the version in `package.json` with the version already in npm.

If that version is already published, the job exits without publishing. Otherwise it runs:

```bash
npm publish --access public --provenance --ignore-scripts
```

Publication uses npm trusted publishing through the GitHub Actions OIDC identity and the `npm-publish` GitHub environment. Do not commit an npm token, an auth-bearing `.npmrc`, or a token value to this repository. The npm package must be configured to trust this repository and workflow before the first publish.

## Run the same checks locally

Use the same install mode and build command as CI:

```bash
npm install --legacy-peer-deps
npm run build
npm pack --dry-run --ignore-scripts
```

The dry run prints the files that would be shipped. Before requesting publication, confirm that it includes at least:

- `dist/index.js`
- `dist/index.esm.js`
- `dist/index.d.ts`

To see whether a version is already in the registry:

```bash
npm view "$(node -p "require('./package.json').name")" version
node -p "require('./package.json').version"
```

Do not run a local `npm publish` for a release covered by this workflow. Merge the version change to `main`, or use the workflow's manual dispatch, so provenance is attached to the package.

## Release checklist

1. Update `package.json` to a version that has not been published.
2. Run the local checks above and inspect `npm pack --dry-run` output.
3. Open a pull request; confirm that the `verify` job passes.
4. Merge to `main`.
5. Confirm the `publish` job succeeds and that the expected version is available from npm.

If a release must be run manually, open the Actions page, select **Publish to npm**, choose **Run workflow**, and verify both `verify` and `publish` jobs afterwards.

## Finding CI logs

In GitHub, open the repository's **Actions** tab, select the **Publish to npm** workflow run, then select the failed job and step. The job log identifies whether the failure occurred during install, build, package-content verification, version lookup, or publication.

With GitHub CLI, list recent runs and inspect failed logs:

```bash
gh run list --workflow publish.yml --limit 10
gh run view <run-id> --log-failed
```

For a successful release, record the workflow URL, the commit SHA, and the published package version in the release or pull-request discussion.
