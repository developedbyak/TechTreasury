import dotenv from "dotenv";
import next from "next";
import nextBuild from "next/dist/build";
import path from "path";
import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
});

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (newPayload) => {
                newPayload.logger.info(
                    `Payload Admin URL: ${newPayload.getAdminURL()}`
                );
            },
        },
    });

    if (process.env.NEXT_BUILD) {
        app.listen(PORT, async () => {
            payload.logger.info(`Next.js is now building...`);
            // @ts-expect-error
            await nextBuild(path.join(__dirname, ".."));
            process.exit();
        });

        return;
    }

    app.use(
        "/api/trpc",
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    );
    app.use((req, res) => nextHandler(req, res));

    nextApp.prepare().then(() => {
        payload.logger.info("Next.js started");

        app.listen(PORT, async () => {
            payload.logger.info(
                `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
            );
        });
    });
};

start();
