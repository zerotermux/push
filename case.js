const logger = require("./utils/logger");
const getDateTime = require("./utils/getDateTime");

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
  setting
) => {
  let groupMetadata;
  let participants;
  switch (command) {
    case "menu":
    case "mn":
      logCommand();
      const header = `⚡\x20*${setting.name}\x20ヅ*\x20|\x20${"*`MENU`*"}`;
      const user =
        ">\x20*⌯\x20\x20USERS*\n*`⌱\x20.SHOWUSERS`*\n*`⌱\x20.DROPUSERS`*\n*`⌱\x20.SAVEUSERSV1`*\n*`⌱\x20.SAVEUSERSV2`*\n";
      const contact =
        ">\x20*⌯\x20\x20CONTACTS*\n*`⌱\x20.SAVE`*\n*`⌱\x20.SHOWCONTACTS`*\n*`⌱\x20.SAVECONTACTSV1`*\n*`⌱\x20.SAVECONTACTSV2`*\n*`⌱\x20.SAVECONTACTSV3`*\n";
      const group = ">\x20*⌯\x20\x20GROUPS*\n*`⌱\x20.GROUPS`*\n";
      const broadcast =
        ">\x20*⌯\x20\x20BROADCAST*\n*`⌱\x20.BROADCASTV1`*\n*`⌱\x20.BROADCASTV2`*\n*`⌱\x20.BROADCASTV3`*\n";
      const pushcontact =
        ">\x20*⌯\x20\x20PUSHKONTAK*\n*`⌱\x20.PUSHKONTAKV1`*\n*`⌱\x20.PUSHKONTAKV2`*\n*`⌱\x20.PUSHKONTAKV3`*\n";
      const settings =
        ">\x20*⌯\x20\x20SETTING*\n*`⌱\x20.ANTICALL`*\n*`⌱\x20.SELFMODE`*\n*`⌱\x20.SETBCLIMIT`*\n*`⌱\x20.SETBCJEDA`*\n*`⌱\x20.SETPKLIMIT`*\n*`⌱\x20.SETPKJEDA`*\n";
      const others =
        ">\x20*⌯\x20\x20LAINNYA*\n*`⌱\x20.STICKER`*\n*`⌱\x20.RELOAD`*\n*`⌱\x20.STOP`*";
      const listCommands = `${user}${contact}${group}${broadcast}${pushcontact}${settings}${others}`;
      const notes = `‼️\x20*NOTES:*\n•\x20*Prefix command:*\x20Tambahkan . (titik) disetiap awal perintah\n•\x20*DWYOR:*\x20do with your own risk\n•\x20*${setting.name}*\x20Dikembangkan bukan untuk promosi *JUDI* atau bahkan untuk *PENIPUAN*\n•\x20Jangan terlalu barbar *STAY SAFE* ✌️`;
      const footer = `*⌱\x20${getDateTime()}*\n`;
      try {
        return reinbot.sendMessage(
          id,
          {
            image: { url: "./data/menu.png" },
            caption: `${header}\n\n${listCommands}\n\n${notes}\n\n${footer}`,
          },
          { quoted: msg }
        );
      } catch (err) {
        logger("error", "COMMAND MENU", err);
        replyCommand(err);
      }
      break;
    default:
      require("./features/users")(
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
      );
      require("./features/groups")(
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
      );
      require("./features/contacts")(
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
      );
      require("./features/broadcast")(
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
      );
      require("./features/pushkontak")(
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
      );
      require("./features/setting")(
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
      );
      require("./features/lainnya")(
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
      );
      break;
  }
};
