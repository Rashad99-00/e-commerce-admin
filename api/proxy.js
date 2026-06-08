const BACKEND_ORIGIN = "http://161.97.154.119";

function collectBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function createHeaders(req) {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (!value || ["host", "origin", "referer"].includes(key)) {
      return;
    }

    headers.set(key, Array.isArray(value) ? value.join(",") : value);
  });

  return headers;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const path = String(req.query.path ?? "");
  const query = new URLSearchParams(req.query);

  query.delete("path");

  const target = new URL(`${BACKEND_ORIGIN}/${path}`);
  target.search = query.toString();

  const method = req.method ?? "GET";
  const body = ["GET", "HEAD"].includes(method) ? undefined : await collectBody(req);
  const response = await fetch(target, {
    method,
    headers: createHeaders(req),
    body,
  });

  response.headers.forEach((value, key) => {
    if (!["content-encoding", "content-length"].includes(key)) {
      res.setHeader(key, value);
    }
  });

  res.status(response.status).send(Buffer.from(await response.arrayBuffer()));
}
