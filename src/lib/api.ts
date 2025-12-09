import { treaty } from "@elysiajs/eden";
import type { ServerApp } from "~/index";

export const rpc = treaty<typeof ServerApp>("localhost:3000");
