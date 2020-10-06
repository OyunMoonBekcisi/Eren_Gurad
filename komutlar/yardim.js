const db = require("quick.db");
const Discord = require('discord.js');
const lrowsxrd = require("../ayarlar.json");
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix.${message.guild.id}`) || lrowsxrd.prefix 
let eklenti = new Discord.RichEmbed()  
.setAuthor(`Weon Guard Altyapısı`, client.user.avatarURL)
.setColor("PURPLE")
.setDescription(`Weon Guard Altyapısı`)  
.addField(`__.bot-koruma__`,`> \`Sunucuza Eklenen Botları Otomatik Kickler!\``,true)
.addField(`__.rol-koruma__`,`> \`Silinen Rolleri Onarır!\` `,true)
.addField(`__.everyone-here__`,`> \`Everyone & Here Atılmasını Engeller!\`  `,true)
.addField(`__.jail__`,`> \`Belirttiğiniz Süre Kadar Jail Atar!\` `,true)
.addField(`__.self-bot__`,`> \`Kendini Bot Yapan Kullanıcıları Susturur!\`  `,true)
.addField(`__.ban__`,`> \`Belirttiğiniz Kişiyi Sunucudan Yasaklar!\` `,true)
.addField(`__.sil__`,`> \`Belirttiğiniz Kadar Mesajı Silersiniz!\`  `,true)
.addField(`__.kick__`,`> \`Belirttiğiniz Kişiyi Kicklersiniz!\`  `,true)
.addField(`__.kilit__`,`> \`Kanalı Belirliten Süre Kadar Kilitler!\` `,true)
 message.channel.send(eklenti) 
  };
  exports.conf = {
    enabled: true,  
    guildOnly: false, 
    aliases: ["yardım","help"], 
    permLevel: 0
  };
  exports.help = {
    name: 'yardım'
  }; 
  