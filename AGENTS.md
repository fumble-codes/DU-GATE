<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Next.js & Deployment TypeScript Rules

## 1. Component & Prop Typing
- Always type `props` using `interface` or `type`.
- For Next.js Pages/App Router components, ensure `params` and `searchParams` are correctly typed as `Promise` where required (Next.js 15+).

## 2. API & Data Fetching
- Use [Zod](https://zod.dev) to validate `fetch` responses. 
- Never assume an API returns the correct shape; parse it to ensure the type matches the runtime data.

## 3. Deployment Safety
- Ensure `next.config.js` does NOT have `ignoreBuildErrors: true`.
- Use `process.env` validation to ensure required environment variables exist, preventing `undefined` type errors in production.

## 4. Path Aliases
- Only use configured path aliases (e.g., `@/components/*`). 
- Avoid relative paths like `../../../` which can break during the build bundling process.
