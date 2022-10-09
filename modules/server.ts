import { FastifyInstance } from "fastify";
import { resolve } from "path";
import fs from "fs";

import Log from "./logs";
import { createLink, findByShorthand, getAllLinks } from "./database";

export default function server(api: FastifyInstance) {
  api.get("/", (req, res) => {
    const stream = fs.createReadStream(resolve("client/public/index.html"));
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

  api.post("/api/all-links", async (req: any, res) => {
    if (!req.body.secret) {
      res.send("Please provide a secret.");
    } else if (req.body.secret !== process.env.SECRET) {
      res.send("Invalid secret provided.");
    } else {
      const links = await getAllLinks();
      res.send(links);
    }
  });

  api.post("/api/create-link", async (req: any, res) => {
    if (req.body?.originalUrl) {
      const link = await createLink(req.body.originalUrl);
      res.send({ status: "success", data: link });
      Log.client("New shortened url created for " + link.originalUrl);
    }
  });

  const port: string = process.env.PORT || "5123";
  const ip: string = process.env.IP || "localhost";

  const start = async () => {
    try {
      await api.listen({ port: parseInt(port), host: ip }).then((ip) => {
        Log.server("Server listening on " + ip);
      });
    } catch (err) {
      api.log.error(err);
      process.exit(1);
    }
  };
  start();
}
