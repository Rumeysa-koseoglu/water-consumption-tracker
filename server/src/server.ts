import express from "express";
import cors from "cors";
import type { Request, Response } from "express";

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Water consumption backend is working!");
});

app.get("/api/status", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Veri akışı hazır." });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
