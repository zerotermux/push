const logger = require("../utils/logger.js");
const getDateTime = require("../utils/getDateTime.js");
const setting = require("../setting.js");

module.exports = (reinbot, m) => {
  const msg = m.messages[0];

  if (
    !msg.message ||
    (msg.key && msg.key.remoteJid === "status@broadcast") ||
    msg.broadcast
  ) {
    return;
  }

  const id = msg.key.remoteJid;
  let media;
  const isGroup = id.endsWith(".us");
  let userId = id;
  let groupId;
  const pushName = msg.pushName;
  if (isGroup) {
    groupId = id;
    userId = msg.key.participant;
  }
  const isMe = msg.key.fromMe;
  const isOwner = userId === setting.owner.whatsapp;

  if (setting.features.selfMode && !isMe) {
    return;
  }

  const msgType = Object.keys(msg.message)[0];
  const msgText =
    msgType === "conversation"
      ? msg.message.conversation
      : msgType === "extendedTextMessage"
      ? msg.message.extendedTextMessage.text
      : msgType === "videoMessage"
      ? msg.message.videoMessage.caption
      : msgType === "imageMessage"
      ? msg.message.imageMessage.caption
      : "";
  if (!msgText.startsWith(".")) {
    return;
  }
  const command = msgText.toLowerCase().substring(1).split(" ")[0].trim();
  const text = msgText.replace(/.(.+?)\s*\b/i, "");

  function logCommand() {
    logger("info", `COMMAND`, command);
  }

  async function reply(textReply) {
    try {
      await reinbot.sendMessage(
        id,
        {
          text: `⚡\x20*${
            setting.name
          }\x20ヅ*\x20|\x20*REPLY*\n\n${textReply}\n\n*⌱\x20${getDateTime()}*\n`,
        },
        { quoted: msg }
      );
    } catch (err) {
      logger("error", "COMMAND", err);
    }
  }

  async function replyCommand(textReply) {
    try {
      await reinbot.sendMessage(
        id,
        {
          text: `⚡\x20*${
            setting.name
          }\x20ヅ*\x20|\x20*${command.toUpperCase()}*\n\n${textReply}\n\n*⌱\x20${getDateTime()}*\n`,
        },
        { quoted: msg }
      );
    } catch (err) {
      logger("error", "COMMAND", err);
    }
  }
  async function onlyOwner() {
    try {
      await replyCommand(
        `‼️\x20*Hallo ${pushName}*\x20👋\nPerintah ini hanya bisa digunakan oleh owner bot\nJika anda ingin memiliki bot seperti ini jangan segan" untuk menghubungi kami\n*Terima kasih*\x20🫶\n\n*Author\x20${
          reinbot.author.name
        }:*\n*Whatsapp:*\x20${
          reinbot.author.whatsapp?.split("@")[0]
        }\n*Telegram:*\x20${reinbot.author.telegram}\n*Youtube:*\x20${
          reinbot.author.youtube
        }\n\n*Owner\x20${setting.owner.name}:*\n*Whatsapp:*\x20${
          setting.owner.whatsapp.split("@")[0]
        }\n*Telegram:*\x20${setting.owner.telegram}\n*Youtube:*\x20${
          setting.owner.youtube
        }`
      );
    } catch (err) {
      logger("error", "ONLY OWNER", err);
    }
  }

  async function onlyGroup() {
    try {
      await replyCommand(
        "‼️\x20*ERROR:*\x20Perintah ini hanya dapat digunakan ketika dalam group chat"
      );
    } catch (err) {
      logger("error", "ONLY GROUP", err);
    }
  }

  require("../case")(
    reinbot,
    msg,
    id,
    media,
    isGroup,
    userId,
    groupId,
    isMe,
    isOwner,
    msgType,
    msgText,
    command,
    text,
    logCommand,
    reply,
    replyCommand,
    onlyOwner,
    onlyGroup,
    setting
  );
};
