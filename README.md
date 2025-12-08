# Elysia Single-File Executable with Bundled Frontend

This project is a template for building a web server with [Elysia](https://elysiajs.com/) that serves a bundled frontend application, all compiled into a single executable file using [Bun's](https://bun.sh/) built-in bundler.

## Features
*   **Bun Bundler**: Modern, new and experimental technique that emits a single executable. Now allows the frontend to be included.
*   **Hot-Reloading**: The frontend unfortunately does not hot-reload automatically, however, if the code changes, the backend will automatically restart.

## Dev

```bash
bun run dev
```

## Building for Production

To bundle the application into a single executable, run:

```bash
bun run build
```

This command will create a single executable file located at `dist/server.exe`. You can run this file directly to start the server.

## Matrix compilation

Bun compilation is environment-agnostic, as long as the target has Bun. However, Bun runtime may demand certain native libraries.

```
./build-matrix.sh
```

Will emit most of the platform, except WindowsARM64.

## Workarounds

If compilation fails:

- Should remove `--bytecode` in any build command. This is experimental, and a performance showcase. If you requires or want to have top-level await, remove the flag.
