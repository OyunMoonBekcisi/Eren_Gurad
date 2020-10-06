const Discord = require('discord.js');

exports.run = async (client, message, args,) => {
  const useruser = "Komut "  + message.author.username + " tarafından çalıştırıldı";
  const userurl = message.author.avatarURL;
  const bayrak = "<a:tr:756164836400037908> ";
  const ping = `${Math.round(client.ping)}ms`;

let embed = new Discord.RichEmbed()
.setTitle('<a:gif:755412621879934976> Anlık Gecikme Süresi <a:gif:755412621879934976>')
.setColor("#00FF00")
.addField("Ping :", ping)
.addField("Lokasyon :", bayrak)
.setFooter(useruser, userurl)
.setTimestamp();

message.channel.send(embed);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Gecikme süresini gösterir.',
  usage: 'ping'
};