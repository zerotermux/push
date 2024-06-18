const getDateTime = require("../utils/getDateTime");

module.exports = async (
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
  setting,
  groupMetadata,
  participants,
  logger
) => {
  switch (command) {
    case "save":
    case "sv":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (isGroup) {
        logger(
          "error",
          "SAVE",
          "‼️\x20\x20\x1b[1mPerintah ini hanya dapat di gunakan ketika berada diluar group!\x1b[0m"
        );
        return replyCommand(
          `‼️\x20*Perintah ini hanya dapat di gunakan ketika berada diluar group!*`
        );
      } else {
        try {
          if (!text) {
            logger(
              "error",
              "SAVE",
              "‼️\x20\x20\x1b[1mNama dibutuhkan\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.save\x20Bayu Mahadika"
            );
            return replyCommand(
              `‼️\x20*Nama dibutuhkan*\n*Contoh:*\x20.save\x20Yt: Bayu Mahadika`
            );
          }
          const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${text}\nORG:${
            setting.name
          }\nTEL;type=CELL;type=VOICE;waid=${userId.split("@")[0]}:+${
            userId.split("@")[0]
          }\nEND:VCARD`;
          const res = await reinbot.sendMessage(
            id,
            {
              contacts: {
                displayName: text,
                contacts: [{ vcard }],
              },
            },
            { quoted: msg }
          );
          return reinbot.sendMessage(
            userId,
            {
              text: `⚡\x20*${
                setting.name
              }*\x20|\x20*SAVE KONTAK*\n\n*Done!*\x20Kontakmu sudah aku save!, save back *${
                msg.pushName
              }*.\n*Terima kasih*\n\n*⌱\x20${getDateTime()}*\n`,
            },
            { quoted: res }
          );
        } catch (err) {
          logger("error", "SAVE", err);
          replyCommand(err);
        }
      }
      break;
    case "showcontacts":
    case "showcontact":
    case "sct":
    case "showkontak":
    case "skt":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      try {
        return replyCommand(
          `‼️\x20\x20*FITUR INI MASIH DALAM TAHAP PENGEMBANGAN*`
        );
      } catch (err) {
        logger("error", "CONTACTS", err);
        replyCommand(err);
      }
      break;
    case "savecontactsv1":
    case "savecontactv1":
    case "savekontakv1":
    case "skv1":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!text) {
        logger(
          "error",
          "SAVEKONTAKV1",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.savekontakv1\x20World\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveContacts}`
        );
        return replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20.savekontakv1\x20world\n*TUTORIAL:*\x20${reinbot.tutorial.saveContacts}`
        );
      }
      require("../utils/readUsers")()
        .then(async (res) => {
          if (!res.data || res.data.length === 0) {
            logger(
              "error",
              "SAVEKONTAKV1",
              `‼️\x20\x20\x1b[1mData pengguna ${
                res.data.length || 0
              }\n\x20\x20Dapatkan data pengguna lebih banyak!\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            return replyCommand(
              `‼️\x20*Data pengguna ${
                res.data.length || 0
              }*\nDapatkan data pengguna lebih banyak!\n*TUTORIAL:*\x20${
                reinbot.tutorial.saveUsers
              }`
            );
          }
          await replyCommand(
            `🎉\x20*SAVE KONTAK START*\n*Target:*\x20${res.data.length}\x20pengguna`
          );
          return require("../utils/saveContacts")(reinbot, msg, res.data, text);
        })
        .catch(async (err) => {
          logger("error", "PUSHKONTAKV1", err);
          return replyCommand(err);
        });
      break;
    case "savecontactsv2":
    case "savecontactv2":
    case "savekontakv2":
    case "skv2":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!isGroup) {
        return onlyGroup();
      }
      if (!text) {
        logger(
          "error",
          "SAVEKONTAKV2",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.savekontakv2\x20World\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveContacts}`
        );
        return replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20.savekontakv2\x20world\n*TUTORIAL:*\x20${reinbot.tutorial.saveContacts}`
        );
      }
      try {
        groupMetadata = await reinbot.groupMetadata(groupId);
        participants = groupMetadata.participants.map((part) => part.id);
        await replyCommand(
          `🎉\x20*SAVE KONTAK START*\n*Nama group:*\x20${
            groupMetadata.subject
          }\n*Owner:*\x20${groupMetadata.owner?.split("@")[0]}\n*Target:*\x20${
            participants.length
          }\x20pengguna`
        );
        return require("../utils/saveContacts")(
          reinbot,
          msg,
          participants,
          text
        );
      } catch (err) {
        logger("error", "SAVEKONTAKV2", err);
        replyCommand(err);
      }
      break;
    case "savecontactsv3":
    case "savecontactv3":
    case "savekontakv3":
    case "skv3":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!text || !text.split("|")[0] || !text.split("|")[1]) {
        logger(
          "error",
          "SAVEKONTAKV3",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.savekontakv3\x20638165378166218|World\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveContacts}`
        );
        return replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20.savekontakv3\x20638165378166218|world\n*TUTORIAL:*\x20${reinbot.tutorial.saveContacts}`
        );
      }
      try {
        if (text.split("|")[0].endsWith("@g.us")) {
          groupMetadata = await reinbot.groupMetadata(text.split("|")[0]);
        } else {
          groupMetadata = await reinbot.groupMetadata(
            `${text.split("|")[0]}@g.us`
          );
        }
        participants = groupMetadata.participants.map((part) => part.id);
        await replyCommand(
          `🎉\x20*SAVE KONTAK START*\n*Nama group:*\x20${
            groupMetadata.subject
          }\n*Owner:*\x20${groupMetadata.owner?.split("@")[0]}\n*Target:*\x20${
            participants.length
          }\x20pengguna`
        );
        return require("../utils/saveContacts")(
          reinbot,
          msg,
          participants,
          text.split("|")[1]
        );
      } catch (err) {
        logger("error", "SAVEKONTAKV3", err);
        replyCommand(err);
      }
      break;
  }
};
