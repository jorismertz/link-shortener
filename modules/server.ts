import { FastifyInstance } from "fastify";
import { resolve } from "path";
import fs from "fs";

import Log from "./logs";
import { createLink, findByShorthand } from "./database";

export default function server(api: FastifyInstance) {
  api.get("/", (req, res) => {
    const stream = fs.createReadStream(resolve("client/index.html"));
    res.send(stream);
  });

  api.get("/:shorthand", async (req: any, res) => {
    const shorthand = req.params?.shorthand;
    const redirectUrl = await findByShorthand(shorthand);

    if (redirectUrl.length !== 0) {
      res.redirect(redirectUrl[0].originalUrl);
    } else {
      res.send("Link not found.");
    }
  });

  api.post("/api/create-link", async (req: any, res) => {
    if (req.body?.originalUrl) {
      const link = await createLink(req.body.originalUrl);
      res.send({ status: "success", data: link });
      Log.client("New shortened url created for " + link.originalUrl);
    }
  });

  const start = async () => {
    try {
      await api.listen({ port: 3000 }).then((ip) => {
        Log.server("Server listening on " + ip);
      });
    } catch (err) {
      api.log.error(err);
      process.exit(1);
    }
  };
  start();
}
