import { Elysia } from "elysia";
import { ServerApp } from "~/index";
import frontend from "./frontend";

const app = new Elysia().use(frontend).use(ServerApp).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
