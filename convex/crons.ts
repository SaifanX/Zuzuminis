import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// 1. Abandoned Cart Recovery Cron: Runs every 30 minutes
crons.interval(
  "recover abandoned carts",
  { minutes: 30 },
  internal.marketing.triggerAbandonedCartRecovery,
  {}
);

// 2. Back-In-Stock Notification Cron: Runs every 1 hour
crons.interval(
  "notify back in stock",
  { hours: 1 },
  internal.marketing.triggerBackInStockAlerts,
  {}
);

// 3. VIP Loyalty Tiers Cron: Runs every 12 hours
crons.interval(
  "update vip tiers",
  { hours: 12 },
  internal.marketing.triggerVipUpgrades,
  {}
);

export default crons;
