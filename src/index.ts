import { Elysia } from "elysia";
import frontend from "./frontend";

const app = new Elysia().use(frontend).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
