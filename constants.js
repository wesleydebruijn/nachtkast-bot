var Server = {
    id: 129603375535751168,
    waitChannelName: "Gaming room",
    waitChannelPrefix: "#"
};

exports.Server = Server;

var Status = {
        IDLE: "idle",
        ONLINE: "online"
};

exports.Status = Status;

var Permissions = {
        // general
        createInstantInvite,
        kickMembers,
        banMembers,
        manageRoles,
        managePermissions,
        manageChannels,
        manageChannel,
        manageServer,
        // text
        readMessages,
        sendMessages,
        sendTTSMessages,
        manageMessages,
        embedLinks,
        attachFiles,
        readMessageHistory,
        mentionEveryone,
        // voice
        voiceConnect,
        voiceSpeak,
        voiceMuteMembers,
        voiceDeafenMembers,
        voiceMoveMembers,
        voiceUseVAD
};

exports.Permissions = Permissions;
