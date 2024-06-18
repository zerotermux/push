const {
  default: reinbotSocket,
  useMultiFileAuthState,
  makeInMemoryStore,
} = require("@whiskeysockets/baileys");
const Pino = require("pino");
const { join } = require("path");
const NodeCache = require("node-cache");
const { readFileSync } = require("fs");
let useCode = false;
let phoneNumber = "";
const iPhoneNumber = process.argv.findIndex((val) =>
  val.startsWith("--number")
);
if (iPhoneNumber >= 0) {
  useCode = true;
  phoneNumber = process.argv[iPhoneNumber]?.split("=")[1];
}

const logger = require("./utils/logger.js");
const extra = require("./lib/extra.js");
let creds;
let browser;

try {
  creds = JSON.parse(readFileSync(join(__dirname, "./data/auth/creds.json")));
} catch (err) {
  creds = null;
}
const msgRetryCounterCache = new NodeCache();
const store = makeInMemoryStore({
  logger: Pino({ level: "silent" }).child({ level: "silent" }),
});

setInterval(() => {
  store.writeToFile(join(__dirname, "./data/store.json"));
  store.readFromFile(join(__dirname, "./data/store.json"));
}, 5000);

async function runReinbot() {
  const { state, saveCreds } = await useMultiFileAuthState(
    join(__dirname, "./data/auth")
  );
  if (!creds) {
    browser = useCode
      ? ["Chrome (Linux)", "", ""]
      : ["Google Chrome (Linux)", "", ""];
  } else {
    if (!creds.pairingCode || creds.pairingCode === "") {
      browser = ["Google Chrome (Linux)", "", ""];
    } else {
      browser = ["Chrome (Linux)", "", ""];
    }
  }
  const reinbot = reinbotSocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    browser: browser,
    printQRInTerminal: !useCode,
    generateHighQualityLinkPreview: true,
    defaultQueryTimeoutMs: undefined,
    syncFullHistory: false,
    msgRetryCounterCache,
  });
  store?.bind(reinbot.ev);
  extra(reinbot, store);
  if (useCode && !reinbot.user && !reinbot.authState.creds.registered) {
    async function connectReinbotWithPairingCode() {
      if (!phoneNumber) {
        const question = require("./utils/question.js");
        phoneNumber = await question(
          "Masukkan nomor whatsapp anda (Contoh: +6285179845835): +"
        );
      }
      try {
        logger(
          "info",
          "KONEKSI",
          `Mohon untuk menunggu sebentar, Request pairing code!..`
        );
        setTimeout(async () => {
          let code = await reinbot.requestPairingCode(phoneNumber);
          code = code?.match(/.{1,4}/g)?.join("-") || code;
          logger("primary", "KONEKSI", `Pairing code anda: ${code}`);
        }, 5000);
      } catch (err) {
        logger("error", "KONEKSI", err);
      }
    }
    await connectReinbotWithPairingCode();
  }
  reinbot.ev.on("connection.update", async (c) => {
    const { connection, lastDisconnect } = c;
    if (connection === "close") {
      const errorStatusCode = lastDisconnect.error.output?.payload?.statusCode;
      const errorMessage = lastDisconnect.error.output?.payload?.message;
      if (errorStatusCode === 515) {
        logger("error", "KONEKSI", errorMessage);
        runReinbot();
      }
      if (errorStatusCode === 503) {
        logger("error", "KONEKSI", errorMessage);
        if (errorMessage === "Stream Errored (unknown)") {
          return process.exit();
        }
      }
      if (errorStatusCode === 500) {
        logger("error", "KONEKSI", errorMessage);
        runReinbot();
      }
      if (errorStatusCode === 440) {
        logger("error", "KONEKSI", errorMessage);
        process.exit();
      }
      if (errorStatusCode === 428) {
        logger("error", "KONEKSI", errorMessage);
        runReinbot();
      }
      if (errorStatusCode === 408) {
        logger("error", "KONEKSI", errorMessage);
        runReinbot();
      }
      if (errorStatusCode === 401) {
        logger("error", "KONEKSI", errorMessage);
        await reinbot.logout();
        runReinbot();
      }
      console.log(lastDisconnect.error);
    }
    if (connection === "open") {
      logger(
        "primary",
        "KONEKSI",
        `Terhubung ${reinbot.user.id.split(":")[0]}`
      );
    }
  });
  reinbot.ev.on("creds.update", saveCreds);
  reinbot.ev.on("call", (c) => require("./events/call.js")(reinbot, c));
  reinbot.ev.on("messages.upsert", (m) =>
    require("./events/message.js")(reinbot, m)
  );
  reinbot.ev.on("group-participants.update", (g) =>
    require("./events/group.js")(reinbot, g)
  );
}

runReinbot();
