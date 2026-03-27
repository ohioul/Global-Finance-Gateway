import { Router, type IRouter } from "express";
import healthRouter from "./health";
import lotsRouter from "./lots";
import contactRouter from "./contact";
import telegramRouter from "./telegram";

const router: IRouter = Router();

router.use(healthRouter);
router.use(lotsRouter);
router.use(contactRouter);
router.use(telegramRouter);

export default router;
