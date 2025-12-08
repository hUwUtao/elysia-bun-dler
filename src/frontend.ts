/*
  This is suppose to bridge the gap between bun production bundler and elysia, while managing to make it work without building the server bundle.
  Suppose to build a single executable server with SPA.
  https://bun.com/reference/bun/HTMLBundle
*/

import Elysia from "elysia";
import indexHtml from "./spa/index.html";

const built = !!indexHtml.files;

function remap(path: string): string {
  let p = path;
  if (p.endsWith("index.html") || p.endsWith(indexHtml.index)) {
    p = "";
  } else if (p.startsWith("/$bunfs/root/")) {
    p = p.slice("/$bunfs/root/".length);
  }
  return p;
}

const frontend = built
  ? indexHtml.files?.reduce(
      (ely, file) =>
        ely.get(
          remap(file.path),
          () =>
            new Response(Bun.file(file.path), {
              headers: {
                ...file.headers,
              },
            }),
        ),
      new Elysia(),
    )
  : await (async () => {
      const build = await Bun.build({
        entrypoints: [indexHtml.index],
        minify: false,
        sourcemap: "linked",
      });

      return build.outputs.reduce(
        (ely, file) =>
          ely.get(
            remap(file.path.slice(2)),
            () =>
              new Response(file, {
                headers: {
                  "Content-Type": file.type,
                },
              }),
          ),
        new Elysia(),
      );
    })();

export default frontend;
