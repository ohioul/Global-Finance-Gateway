import { Router } from "express";

const router = Router();

const TG_TOKEN = "8634695110:AAEbGK9Hzc4KWfZE3gojRHZE2APWRKDlX_w";
const TG_CHAT_ID = "8507111889";

router.post("/telegram", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !service) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  const lines = [
    `<b>🔔 Новая заявка — Interpayer</b>`,
    ``,
    `<b>Имя:</b> ${name}`,
    `<b>Email:</b> ${email}`,
    phone ? `<b>Телефон:</b> ${phone}` : null,
    `<b>Услуга:</b> ${service}`,
    message ? `<b>Сообщение:</b> ${message}` : null,
  ].filter(Boolean).join("\n");

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: lines, parse_mode: "HTML" }),
      }
    );
    const tgData = await tgRes.json() as { ok: boolean };
    if (!tgData.ok) {
      return res.status(502).json({ ok: false, error: "Telegram error" });
    }
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
