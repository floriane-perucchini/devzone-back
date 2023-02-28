import express from "express";
import logger from "morgan";
import fs from "fs";
import cors from "cors";
import router from "./app/routes/index.router.js";
import { errorsHandler } from "./app/middlewares/index.middleware.js";
import { extract } from '@extractus/feed-extractor'
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(
  logger("common", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

const meta = {
  service: 'feed-reader',
  lang: 'javascript',
  server: 'express',
  platform: 'node',
}

app.get('/feed', async (req, res) => {
  const url = req.query.url
  if (!url) {
    return res.json(meta)
  }

  const {
    useISODateFormat = 'y',
    normalization = 'y',
  } = req.query

  const opts = {
    useISODateFormat: useISODateFormat !== 'n',
    normalization: normalization !== 'n',
  }

  try {
    const data = await extract(url, opts)
    return res.json({
      error: 0,
      message: 'feed data has been extracted successfully',
      data,
      meta,
    })
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
      data: null,
      meta,
    })
  }
})


app.use(errorsHandler);

export default app;
