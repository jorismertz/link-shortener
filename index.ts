import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from "@fastify/cors";

import server from "./modules/server";

export const logger = true;

const api = fastify({ logger: false });

// This allows for cross origin requests while running the site in dev environment
api.register(cors, (instance) => {
  return (req: any, callback: any) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});

api.register(fastifyStatic, {
  root: path.join(__dirname, "/client/public"),
  prefix: "/public/", // optional: default '/'
});

server(api);
