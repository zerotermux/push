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
    case "anticall":
    case "ac":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      try {
        setting.features.antiCall.status = !setting.features.antiCall.status;
        return replyCommand(
          `*DONE!*\nStatus *_anticall_* saat ini ${
            setting.features.antiCall.status ? "ACTIVE" : "NON ACTIVE"
          }`
        );
      } catch (err) {
        logger("error", "ANTICALL", err);
        replyCommand(err);
      }
      break;
    case "selfmode":
    case "sm":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      try {
        setting.features.selfMode = !setting.features.selfMode;
        return replyCommand(
          `*DONE!*\nStatus *_selfmode_* saat ini ${
            setting.features.selfMode ? "ACTIVE" : "NON ACTIVE"
          }`
        );
      } catch (err) {
        logger("error", "ANTICALL", err);
        replyCommand(err);
      }
      break;
    case "setbclimit":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!text) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Perintah kurang lengkap\n*CONTOH:*\x20.setbclimit\x2050`
        );
      }
      if (isNaN(text)) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Nilai yang diharapkan salah, dibutuhkan type number\n*CONTOH:*\x20.setbclimit\x2050`
        );
      }
      try {
        setting.features.broadcast.limit = text;
        return replyCommand(
          `*DONE!*\n*_Limit broadcast_* saat ini ${setting.features.broadcast.limit}`
        );
      } catch (err) {
        logger("error", "SETBCLIMIT", err);
        replyCommand(err);
      }
      break;
    case "setbcjeda":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!text) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Perintah kurang lengkap\n*CONTOH:*\x20.setbcjeda\x205000`
        );
      }
      if (isNaN(text)) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Nilai yang diharapkan salah, dibutuhkan type number\n*CONTOH:*\x20.setbcjeda\x205000`
        );
      }
      try {
        setting.features.broadcast.jeda = text;
        return replyCommand(
          `*DONE!*\n*_Jeda broadcast_* saat ini ${setting.features.broadcast.jeda}ms`
        );
      } catch (err) {
        logger("error", "SETBCJEDA", err);
        replyCommand(err);
      }
      break;
    case "setpklimit":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!text) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Perintah kurang lengkap\n*CONTOH:*\x20.setpklimit\x2050`
        );
      }
      if (isNaN(text)) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Nilai yang diharapkan salah, dibutuhkan type number\n*CONTOH:*\x20.setpklimit\x2050`
        );
      }
      try {
        setting.features.pushContacts.limit = text;
        return replyCommand(
          `*DONE!*\n*_Limit push kontak_* saat ini ${setting.features.pushContacts.limit}`
        );
      } catch (err) {
        logger("error", "SETPKLIMIT", err);
        replyCommand(err);
      }
      break;
    case "setpkjeda":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!text) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Perintah kurang lengkap\n*CONTOH:*\x20.setpkjeda\x205000`
        );
      }
      if (isNaN(text)) {
        return replyCommand(
          `‼️\x20*Gagal!*\x20Nilai yang diharapkan salah, dibutuhkan type number\n*CONTOH:*\x20.setpkjeda\x205000ms`
        );
      }
      try {
        setting.features.pushContacts.jeda = text;
        return replyCommand(
          `*DONE!*\n*_Jeda push kontak_* saat ini ${setting.features.pushContacts.jeda}ms`
        );
      } catch (err) {
        logger("error", "SETPKJEDA", err);
        replyCommand(err);
      }
      break;
  }
};
