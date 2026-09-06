import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { obligationRoutes } from "./modules/obligations/routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { startIndexer } from "./stellar/indexer.js";
import { startNotificationEngine } from "./jobs/notifications.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.use("/api/obligations", obligationRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);

  if (process.env.INDEXER_ENABLED === "true") {
    startIndexer().catch(console.error);
  }

  if (process.env.NOTIFICATIONS_ENABLED === "true") {
    startNotificationEngine().catch(console.error);
  }
});

export default app;
