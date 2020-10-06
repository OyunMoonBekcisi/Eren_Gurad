  const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
      
    if (!message.member.roles.find("name", "Ban Hammer")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`Ban Hammer*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    } 
const kisi = message.mentions.users.first()

let reason = args.slice(1).join(' ')
    if (!args[0]) return message.channel.send(":no_entry: Lütfen yasaklamak istediğiniz kullanıcıyı etiketleyiniz.")
    let user = message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user

    if (!user) return message.channel.send(`Etiketlediğiniz kullanıcıyı sunucuda bulamadım.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`Etiketlediğiniz kullanıcıyı sunucuda bulamadım.`)
    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Kendi yetkimin üstündeki kişileri yasaklayamam.`)
    if (!reason) reason = 'Neden belirtilmemiş.'
  
  message.guild.ban(kisi)
  
  let embed1 = new Discord.RichEmbed()
                .setColor('PURPLE')
                .addField(`${kisi} kişisi` + reason + "sebebi ile ", "yasaklandı.")
                .setFooter("Yasaklayan yetkili:", `${message.author.username}`);
  
   let embed = new Discord.RichEmbed()
                .setColor('PURPLE')
                .addField(`${kisi} kişisi ${reason} sebebi ile `, "yasaklandı.")
                bot.channels.get("757834710507585647").send(embed1).then(message.channel.send(embed))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla"],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Sunucuda birisini yasaklar',
  category: 'yetkili',
  usage: 'ban @kişi'
}
