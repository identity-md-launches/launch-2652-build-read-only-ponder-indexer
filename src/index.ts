import { ponder } from "ponder:registry";
import { rawLog } from "ponder:schema";
import { rawLogRow } from "./raw-log";

// One typed handler per verified ABI event. The SQL insert is idempotent.
ponder.on("PLEA:Allowed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PLEA:Approval", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PLEA:Initialized", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PLEA:Launched", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PLEA:LetterboxSet", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PLEA:OwnershipTransferStarted", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PLEA:OwnershipTransferred", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PLEA:Transfer", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:CabalBegins", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:EIP712DomainChanged", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:OracleSignerSet", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:PleaExpired", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:PleaFailed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:PleaFlags", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:PleaLapsed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:PleaSubmitted", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:SellExecuted", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("CabalGate:Verdict", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:BonusBurned", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:BonusPaid", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:LeftoverToWall", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:PrizeFunded", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:PrizePaid", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:Recorded", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:SeasonClosedOut", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Seasons:SeatMultiplier", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaDistributor:Claimed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaDistributor:OwnershipTransferStarted", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaDistributor:OwnershipTransferred", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaDistributor:RootSet", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaLaunch:HookDeployed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaLaunch:LetterboxDeployed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaLaunch:TradingOpened", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaLaunch:TribunalDeployed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Letterbox:Delivered", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Letterbox:Escrowed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Letterbox:NameSet", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Letterbox:Settled", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Tribunal:EIP712DomainChanged", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Tribunal:Objected", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Tribunal:ObjectionVoid", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Tribunal:OracleSignerSet", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Tribunal:Ruled", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Tribunal:StakeSettled", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:CapRatcheted", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:CashbackPaidClaims", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:CashbackPaidPlain", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:CashbackStacked", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:FeeRefunded", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:FeesTaken", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:PayoutsToPool", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:PriceCheckpoint", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:Seeded", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:Trimmed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:WallDeployed", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("PleaHook:WallSettled", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

ponder.on("Stacker:Stacked", async ({ event, context }) => {
  await context.db.insert(rawLog).values(rawLogRow(event)).onConflictDoNothing();
});

