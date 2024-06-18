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
    case "showusers":
    case "showuser":
    case "su":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      require("../utils/readUsers")()
        .then(async (res) => {
          if (!res.data || res.data.length === 0) {
            logger(
              "error",
              "SHOWUSERS",
              `‼️\x20\x20\x1b[1mJumlah data pengguna saat ini ${
                res.data.length || 0
              }\x1b[0m\n\x20\x20Dapatkan data pengguna lebih banyak!\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            return replyCommand(
              `‼️\x20*Jumlah data pengguna saat ini ${
                res.data.length || 0
              }*\nDapatkan data pengguna lebih banyak!\n*TUTORIAL:*\x20${
                reinbot.tutorial.saveUsers
              }`
            );
          } else {
            return replyCommand(
              `🎉\x20*Jumlah data pengguna saat ini:\x20${res.data.length}*`
            );
          }
        })
        .catch(async (err) => {
          logger("error", "SHOWUSERS", err);
          return replyCommand(err);
        });
      break;
    case "dropusers":
    case "dropuser":
    case "du":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      await require("../utils/dropUsers")()
        .then(async (res) => {
          if (!res.data || res.data.length === 0) {
            logger(
              "error",
              "DROPUSERS",
              `‼️\x20\x20\x1b[1mJumlah data pengguna saat ini ${
                res.data.length || 0
              }\x1b[0m\n\x20\x20Tidak ada data pengguna yang akan dihapus\n\x20\x20Dapatkan data pengguna lebih banyak!\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${
                reinbot.tutorial.saveUsers
              }`
            );
            return replyCommand(
              `‼️\x20*Jumlah data pengguna saat ini ${
                res.data.length || 0
              }*\nTidak ada data pengguna yang akan dihapus\nDapatkan data pengguna lebih banyak!\n*TUTORIAL:*\x20${
                reinbot.tutorial.saveUsers
              }`
            );
          } else {
            return replyCommand(
              `🎉\x20*${res.data.length} data pengguna telah berhasil dihapus*`
            );
          }
        })
        .catch(async (err) => {
          logger("error", "DROPUSERS", err);
          return replyCommand(err);
        });
      break;
    case "saveusersv1":
    case "saveuserv1":
    case "suv1":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!isGroup) {
        return onlyGroup();
      }
      try {
        groupMetadata = await reinbot.groupMetadata(groupId);
        participants = groupMetadata.participants.map((part) => part.id);
        require("../utils/saveUsers")(participants)
          .then(async (res) => {
            await replyCommand(
              `🎉\x20*Target ditemukan*\n*Nama Group:*\x20${
                groupMetadata.subject
              }\n*Owner Group:*\x20${
                groupMetadata.owner?.split("@")[0]
              }\n*Jumlah member:*\x20${groupMetadata.participants.length}\n\n*${
                res.data.newUsers.length
              } pengguna telah berhasil disimpan!*`
            );
            reinbot.busy = false;
          })
          .catch(async (err) => {
            logger("error", "SAVEUSERSV1", err);
            return replyCommand(err);
          });
      } catch (err) {
        logger("error", "SAVEUSERSV1", err);
        replyCommand(err);
      }
      break;
    case "saveusersv2":
    case "saveuserv2":
    case "suv2":
      logCommand();
      if (!isMe && !isOwner) {
        return onlyOwner();
      }
      if (!text || isNaN(parseInt(text))) {
        logger(
          "error",
          "SAVEUSERSV2",
          `‼️\x20\x20\x1b[1mPerintah kurang lengkap atau tidak valid\x1b[0m\n\x20\x20\x1b[1mContoh:\x1b[0m\x20.saveusersv2\x202763622651837\n\x20\x20\x1b[1mTUTORIAL:\x1b[0m\x20${reinbot.tutorial.saveUsers}`
        );
        return replyCommand(
          `‼️\x20*Perintah kurang lengkap atau tidak valid*\n*Contoh:*\x20saveusersv2\x202763622651837\n\n*Tutorial:*\x20${reinbot.tutorial.saveUsers}`
        );
      }
      try {
        if (text.endsWith("@g.us")) {
          groupMetadata = await reinbot.groupMetadata(text);
        } else {
          groupMetadata = await reinbot.groupMetadata(`${text}@g.us`);
        }
        participants = groupMetadata.participants.map((part) => part.id);
        return require("../utils/saveUsers")(participants)
          .then((res) => {
            return replyCommand(
              `🎉\x20*Target ditemukan*\n*Nama Group:*\x20${
                groupMetadata.subject
              }\n*Owner Group:*\x20${
                groupMetadata.owner?.split("@")[0]
              }\n*Jumlah member:*\x20${groupMetadata.participants.length}\n\n*${
                res.data.newUsers.length
              } pengguna telah berhasil disimpan!*`
            );
          })
          .catch(async (err) => {
            logger("error", "SAVEUSERSV2", err);
            replyCommand(err);
          });
      } catch (err) {
        logger("error", "SAVEUSERSV2", err);
        replyCommand(err);
      }
      break;
  }
};
