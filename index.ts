import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

import database from "./modules/database";
import server from "./modules/server";

import prisma from "./prisma";

export const logger = true;

const api = fastify({ logger: false });

api.register(fastifyStatic, {
  root: path.join(__dirname, "/client/public"),
  prefix: "/public/", // optional: default '/'
});

database()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

server(api);
