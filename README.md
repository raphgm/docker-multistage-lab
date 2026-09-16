# Docker Multi-Stage Build Lab

A minimal, real Express + TypeScript app used to measure — not just claim — what a multi-stage Docker build actually throws away.

Companion lab for the article [Multi-Stage Builds: What Actually Gets Thrown Away](https://raphaelgmomoh.pages.dev/articles/docker-multistage-builds-what-gets-thrown-away).

## Real, measured results

Both images were built with `az acr build` (no local Docker daemon involved) and measured via `az acr manifest list-metadata`:

| Build | Image size |
|---|---|
| `Dockerfile.single` (naive single-stage) | 426.4 MB |
| `Dockerfile.multistage` (build + runtime stages) | 64.3 MB |

That's an 85% reduction — roughly 6.6x smaller — from the exact same application code and dependencies.

## Repository Structure

```text
.
├── src/server.ts           # Minimal Express app with a /healthz route
├── Dockerfile.single        # Naive single-stage build (for comparison)
├── Dockerfile.multistage    # Real multi-stage build
├── package.json
└── tsconfig.json
```

## Quick Start

```bash
npm install
npm run build
npm start
curl localhost:3000/healthz
```

## Build both images yourself

```bash
az acr build --registry <your-acr> --image multistage-lab:single -f Dockerfile.single .
az acr build --registry <your-acr> --image multistage-lab:multistage -f Dockerfile.multistage .
az acr manifest list-metadata --registry <your-acr> --name multistage-lab --query "[].{tags:tags,size:imageSize}"
```

## License

MIT — use it, fork it, adapt it to your own environment.
