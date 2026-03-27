import { Router, type IRouter } from "express";
import healthRouter from "./health";
import lotsRouter from "./lots";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(lotsRouter);
router.use(contactRouter);

export default router;
