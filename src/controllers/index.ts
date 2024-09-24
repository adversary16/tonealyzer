import express from "express";
import { baseRouter } from "../routes";
export const controller = express();

export const run = (port: number) => {
  controller.listen(port, () => {
    controller.use(baseRouter);
    console.log("listening on", port);
  });
};
