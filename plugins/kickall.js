/*created by Kgtech 🕵
contact dev1 237656520674 ♻️
contact dev2 237650564445 ♻️
© Copy coder alert ⚠
*/





const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "🧨",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isCmd,
    command,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`❌ This command is only for groups.`);

        // Check if the user is an admin
        if (!isAdmins) return reply(`❌ Only group admins can use this command.`);

        // Check if the user is the bot owner
        if (!isOwner) return reply(`❌ Only the bot owner can use this command.`);

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`❌ I need admin privileges to kick users.`);

        // Fetch all participants from the group
        const allParticipants = groupMetadata.participants;

        // Filter out admins and the bot itself
        const nonAdminParticipants = allParticipants.filter(member => 
            !groupAdmins.includes(member.id) && member.id !== conn.user.jid
        );

        if (nonAdminParticipants.length === 0) {
            return reply(`✅ There are no non-admin members to kick.`);
        }

        // Start removing non-admin participants
        for (let participant of nonAdminParticipants) {
            await conn.groupParticipantsUpdate(from, [participant.id], "remove")
                .catch(err => console.error(`Failed to remove ${participant.id}:`, err));
        }

        // Send a confirmation message once done
        reply(`✅ Successfully kicked all non-admin members from the group.`);
    } catch (e) {
        console.error('Error kicking users:', e);
        reply('❌ An error occurred while trying to kick all members. Please try again.');
    }
});