const Discord = require("discord.js");
module.exports = {
    name: "unmute",
    aliases: ["um"],
    category: "Moderation",
    description: "UNMUTE THAT GOD DAMN USER WHO MUTED USING THE MUTE COMMAND",
    usage: "[command][user]",
    example: "=unmute @noobboi007",
    permissionss: "ADMINISTRATOR",
    run: async (client, message, args) => {
    await message.delete();
    
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        const botnopermissionmanage_rolesembed = new Discord.RichEmbed()
        botnopermissionmanage_rolesembed.setColor(0xFF0000)
        botnopermissionmanage_rolesembed.setDescription("I don't have Manage Roles Permission.")
        return message.channel.send(botnopermissionmanage_rolesembed)
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const nopermissionunmuteembed = new Discord.RichEmbed()
        nopermissionunmuteembed.setColor(0xFF0000)
        nopermissionunmuteembed.setDescription(":x: You do not have permissions to unmute members. Please contact a staff member.[Missing Permission:- Manage Messages]")
        return message.channel.send(nopermissionunmuteembed)
    }

    let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    if (!person) return message.reply("Couldn't find that member");

    let muterole = message.guild.roles.find(role => role.name === 'Muted');

    if (!muterole) return message.reply("Couldn't find the mute role");


   
    
    person.removeRole(muterole.id);
    const unmuteembed = new Discord.RichEmbed()
    unmuteembed.setColor(0x00FFFF)
    unmuteembed.setDescription(`✅ ${person.user.tag} has been unmuted!`);
    message.channel.send(unmuteembed)

}


}