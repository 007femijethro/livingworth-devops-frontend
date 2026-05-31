import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./public/", import.meta.url));
const port = Number(process.env.PORT ?? 3000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

function resolvePath(urlPath) {
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^\.\.(\/|\\|$)/, "");
  const requestedPath = join(root, cleanPath === "/" ? "index.html" : cleanPath);
  if (!requestedPath.startsWith(root)) {
    return join(root, "index.html");
  }
  return requestedPath;
}

createServer((request, response) => {
  const filePath = resolvePath(request.url ?? "/");
  const fallbackPath = join(root, "index.html");
  const pathToServe = existsSync(filePath) && statSync(filePath).isFile() ? filePath : fallbackPath;
  const contentType = contentTypes[extname(pathToServe)] ?? "application/octet-stream";

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(pathToServe).pipe(response);
}).listen(port, () => {
  console.log(`DevOps mentorship frontend running at http://localhost:${port}`);
});
