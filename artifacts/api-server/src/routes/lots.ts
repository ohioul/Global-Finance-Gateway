import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { lotsTable } from "@workspace/db/schema";
import { GetLotsResponse } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/lots", async (req, res) => {
  try {
    const lots = await db.select().from(lotsTable).where(eq(lotsTable.available, true));
    const data = GetLotsResponse.parse(lots);
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch lots");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
