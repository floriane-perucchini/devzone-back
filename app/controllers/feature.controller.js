import { extract } from "@extractus/feed-extractor";

const featureController = {
  /* rss: async function (request, response, next) {
     try {
       const feed = await extract('https://news.google.com/rss');
       response.json(feed);
     } catch (error) {
       response.status(404).send('404 : DEAD END !');
     }
   }
   */
  rss: async function (request, response) {
    const meta = {
      service: "feed-reader",
      lang: "javascript",
      server: "express",
      platform: "node",
    };
    const url = request.query.url;
    if (!url) {
      return response.json(meta);
    }
    const { useISODateFormat = "y", normalization = "n" } = request.query;

    const opts = {
      useISODateFormat: useISODateFormat !== "n",
      normalization: normalization !== "n",
    };
    try {
      const data = await extract(url, opts);
      return response.json({
        error: 0,
        message: "feed data has been extracted successfully",
        data,
        meta,
      });
    } catch (error) {
      return response.json({
        error: 1,
        message: error.message,
        data: null,
        meta,
      });
    }
  },
};

export default featureController;
