import { existsSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Elysia, t } from "elysia";

export const ServerApp = new Elysia({ prefix: "/api" })
  .post(
    "/upload",
    async ({ body: { file }, set }) => {
      try {
        // 确保上传目录存在
        const uploadDir = join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir, { recursive: true });
        }

        // 生成唯一文件名
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        const filePath = join(uploadDir, fileName);

        // 将文件写入磁盘
        const buffer = await file.arrayBuffer();
        await writeFile(filePath, new Uint8Array(buffer));

        // 返回文件的相对路径
        return {
          success: true,
          message: "文件上传成功",
          filePath: `/uploads/${fileName}`,
        };
      } catch (error) {
        console.error("上传错误:", error);
        set.status = 500;
        return {
          success: false,
          message: "文件上传失败",
        };
      }
    },
    {
      body: t.Object({
        file: t.File(),
      }),
    }
  )
  .get("/message", () => "Hello, World!");

export type ServerApp = typeof ServerApp;
