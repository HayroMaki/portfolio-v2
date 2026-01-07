# Portfolio v2

SvelteKit + Tailwind portfolio site, styled with manga-inspired aesthetic described in the project brief. This repo is configured to deploy on **Cloudflare Pages**.

## Prerequisites

- Node 20+
- npm 10+
- Cloudflare account with Pages enabled
- [`wrangler`](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI (already included in `devDependencies`)

## Local development

```bash
npm install
npm run dev
# or open the browser automatically
npm run dev -- --open
```

## Type checking

```bash
npm run check
```

## Production build

```bash
npm run build
npm run preview   # serve the built app locally
```

## Cloudflare Pages deployment

1. **Build the Cloudflare bundle**
   ```bash
   npm run build
   ```

2. **Preview with Cloudflare’s emulator**
   ```bash
   npm run cf:dev
   ```

3. **Deploy**
   - Preview branch (optional):
     ```bash
     npm run cf:preview
     ```
   - Production:
     ```bash
     npm run cf:deploy
     ```

All Cloudflare commands rely on the generated `.svelte-kit/cloudflare` bundle from `@sveltejs/adapter-cloudflare`. Set the `CF_ACCOUNT_ID` and `CF_API_TOKEN` environment variables or run `wrangler login` before deploying.

### Cloudflare Pages dashboard steps

1. Create a new Pages project and connect this Git repository.
2. Build command: `npm run build`.
3. Deploy command: `npx wrangler pages deploy .svelte-kit/cloudflare --project-name=portfolio`.

Once the build succeeds, Cloudflare will expose preview and production URLs automatically. Use the provided scripts for manual deploys or rely on the Pages Git integration for CI-driven deployments.
