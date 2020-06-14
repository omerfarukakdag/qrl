import express, { Request, Response } from "express";
import QRCode from "qrcode";

(async () => {
  const app = express();
  const port = process.env.PORT || 8082;

  app.set("views", "./src/views");
  app.set("view engine", "pug");

  app.get("/*", async (req: Request, res: Response) => {
    const input = req.originalUrl.slice(1);

    if (!input) {
      return res.status(400).send("No input provided to generate a QR code");
    }

    try {
      const title = "QRL";
      const data = await QRCode.toString(decodeURI(input), { type: "svg" });
      res.render("index", { title, data });
    } catch (error) {
      res.status(500).send("An error occurred");
    }
  });

  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
