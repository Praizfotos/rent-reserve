import { Router } from "express";
import { z } from "zod";
import { obligationService } from "./service.js";

const router = Router();

const createObligationSchema = z.object({
  tenant: z.string().startsWith("G"),
  landlord: z.string().startsWith("G"),
  propertyRef: z.string().min(1),
  asset: z.string().startsWith("G"),
  targetAmount: z.string().regex(/^\d+$/),
  startTime: z.string().regex(/^\d+$/),
  dueTime: z.string().regex(/^\d+$/),
  source: z.string().startsWith("G"),
});

const contributeSchema = z.object({
  obligationId: z.string().min(1),
  contributor: z.string().startsWith("G"),
  amount: z.string().regex(/^\d+$/),
  source: z.string().startsWith("G"),
});

const obligationIdSchema = z.object({
  id: z.string().min(1),
});

router.post("/", async (req, res, next) => {
  try {
    const params = createObligationSchema.parse(req.body);
    const result = await obligationService.createObligation({
      ...params,
      targetAmount: BigInt(params.targetAmount),
      startTime: BigInt(params.startTime),
      dueTime: BigInt(params.dueTime),
    });
    res.json({ id: result });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/accept", async (req, res, next) => {
  try {
    const { id } = obligationIdSchema.parse(req.params);
    const { source } = z
      .object({ source: z.string().startsWith("G") })
      .parse(req.body);
    await obligationService.acceptObligation(id, source);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/contribute", async (req, res, next) => {
  try {
    const params = contributeSchema.parse(req.body);
    await obligationService.contribute({
      ...params,
      amount: BigInt(params.amount),
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/settle", async (req, res, next) => {
  try {
    const { id } = obligationIdSchema.parse(req.params);
    const { source } = z
      .object({ source: z.string().startsWith("G") })
      .parse(req.body);
    await obligationService.settle(id, source);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/cancel", async (req, res, next) => {
  try {
    const { id } = obligationIdSchema.parse(req.params);
    const { source } = z
      .object({ source: z.string().startsWith("G") })
      .parse(req.body);
    await obligationService.cancel(id, source);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = obligationIdSchema.parse(req.params);
    const obligation = await obligationService.getObligation(id);
    res.json(obligation);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/remaining", async (req, res, next) => {
  try {
    const { id } = obligationIdSchema.parse(req.params);
    const remaining = await obligationService.getRemaining(id);
    res.json({ remaining: remaining.toString() });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/progress", async (req, res, next) => {
  try {
    const { id } = obligationIdSchema.parse(req.params);
    const progress = await obligationService.getProgressPct(id);
    res.json({ progress });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/contributor/:contributor", async (req, res, next) => {
  try {
    const { id, contributor } = obligationIdSchema
      .extend({ contributor: z.string().startsWith("G") })
      .parse(req.params);
    const total = await obligationService.getContributorTotal(
      id,
      contributor
    );
    res.json({ total: total.toString() });
  } catch (error) {
    next(error);
  }
});

export { router as obligationRoutes };
