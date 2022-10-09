import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from "@fastify/cors";

import server from "./modules/server";

export const logger = true;

const api = fastify({ logger: false });
const cors_enabled = true;

// This allows for cross origin requests while running the site in dev environment
if (cors_enabled) {
  api.register(cors, (instance) => {
    return (req: any, callback: any) => {
      const corsOptions = {
        origin: true,
      };
      if (/^localhost$/m.test(req.headers.origin)) {
        corsOptions.origin = false;
      }
      callback(null, corsOptions);
    };
  });
}

api.register(fastifyStatic, {
  root: path.join(__dirname, "/client/public"),
  prefix: "/public/", // optional: default '/'
});

server(api);
