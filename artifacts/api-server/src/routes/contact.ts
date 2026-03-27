import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    const body = SubmitContactBody.parse(req.body);
    await db.insert(contactsTable).values({
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
    });
    const response = SubmitContactResponse.parse({ success: true, message: "Ваша заявка принята. Мы свяжемся с вами в ближайшее время." });
    res.json(response);
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
