import express, { type Request, type Response } from "express";
import { query } from "../pool/db.js";

const router = express.Router();

router.post("/add-entry", async (req: Request, res: Response) => {
  const { date, amount, category } = req.body;
  if (!date || !amount || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be positive" });
  }

  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "invalid date format" });
  }

  try {
    const result = await query(
      `INSERT INTO water_usage ( date, amount, category) VALUES  ($1, $2, $3) RETURNING *`,
      [date, amount, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create entry", error: err.message });
  }
});

router.get("/entries", async (req: Request, res: Response) => {
  try {
    const result = await query(`SELECT * FROM water_usage ORDER BY id ASC`);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "request failed" });
  }
});

router.put("/entries/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, amount, category } = req.body;

  if (!date || !amount || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({ message: "Amount must be positive" });
  }

  try {
    const result = await query(
      `UPDATE water_usage
    SET date = $1, amount = $2, category = $3
    WHERE id = $4
    RETURNING *`,
      [date, amount, category, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Failed to update entry" });
  }
});

router.delete("/entries/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await query(
      `DELETE FROM water_usage WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res
      .status(200)
      .json({ message: "Entry deleted successfully", deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete entry" });
  }
});

export default router;
