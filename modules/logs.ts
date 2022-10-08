import { logger } from "..";

const prefix = "◘";

const color = {
  server: "\x1b[34m",
  client: "\x1b[32m",
  reset: "\x1b[0m",
};

function LogMessage(msg: string, type: string) {
  if (!logger) return;
  let clr = "";
  if (type === "server") clr = color.server;
  if (type === "client") clr = color.client;
  console.log(clr + prefix + ` ${type} ` + color.reset + msg);
}

const Log = {
  server: (msg: string) => LogMessage(msg, "server"),
  client: (msg: string) => LogMessage(msg, "client"),
};

export default Log;
