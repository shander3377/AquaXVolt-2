const Discord = require("discord.js");

module.exports = {
    name: "removerole",
    aliases: ["rr"],
    category: "Moderation",
    description: "Remove a role from a user to make then suffer =D",
    usage: "[command][person[role]",
    example: "=removerole @noobgirl007 noob boi",
    permissionss: "ADMINISTRATOR",
    run: async (client, message, args) => {
    await message.delete();
    
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        const botnopermissionmanage_rolesembed = new Discord.RichEmbed()
        botnopermissionmanage_rolesembed.setColor(0xFF0000)
        botnopermissionmanage_rolesembed.setDescription("I Don't Have Manage Roles Permission.")
        return message.channel.send(botnopermissionmanage_rolesembed)
    }

    if (!message.member.hasPermission("MANAGE_ROLES")) {
        const nopermissionmanage_rolesembed = new Discord.RichEmbed()
        nopermissionmanage_rolesembed.setColor(0xFF0000)
        nopermissionmanage_rolesembed.setDescription("You don't have MANAGE ROLES permission to perform this command!")
        return message.channel.send(nopermissionmanage_rolesembed)
    }

    let rmember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if (!rmember) return message.channel.send("Please provide a user to remove a role!")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.mentions.roles.first()
    if (!role) return message.channel.send("Please provide a role to remove to said user.")

    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
        return message.channel.send("I don't have Manage Roles Permission.")

    if (!rmember.roles.has(role.id)) {
        return message.channel.send(`${rmember.displayName}, don't have the role!`)
    } else {
        if (rmember.removeRole(role.id).catch(e => console.log(e.message)))
            message.channel.send(`The role, ${role.name}, has been removed from ${rmember.displayName}`)

    }
}

}