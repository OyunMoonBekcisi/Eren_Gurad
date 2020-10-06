const Discord = require("discord.js");
const db = require('quick.db')
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
  

if(!message.member.roles.has('756854843041251426')) { //jail yetkilisinin rol id
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('Birine jail atmak için <@&756854843041251426> rolüne sahip olmalısın!')
return message.channel.send(embed)
}
let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kişi) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('Jail Atacağın Kullanıcıyı Etiketle Yada ID belirt!')
return message.channel.send(embed)
}
if(kişi.roles.has('756854843041251426')) { //jail yetkilisinin rol id
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`Aynı Role Sahip Olduğun Kişiyi Jaile Atamazsın!`)
return message.channel.send(embed)
}  
let zaman = args[1]
if(!args[1]) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`<@${kişi.id}> adlı kullanıcı ne kadar süre hapiste olucak?`)
return message.channel.send(embed)
}
let sebep = args.join(' ').slice(args[1].length+args[0].length + 1)
if(!sebep) sebep = 'Sebep belirtilmemiş.'
  
const hapis = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`Bir Kullanıcı Cezalıya Atıldı!`)
.setThumbnail(kişi.user.avatarURL)
.addField(`Kullanıcı`, kişi,)
.addField(`Yetkili`, `<@${message.author.id}>`,)
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)
.setTimestamp()

const dm = new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`**${message.guild.name}** Adlı Sunucuda Cezalıya Atıldın!`)
.addField(`Cezalıya Atan Yetkili`,`<@${message.author.id}>`)
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)

const tahliye = new Discord.RichEmbed()
.setColor('GREEN')
.setDescription(`Bir Kullanıcı Tahliye Oldu!`)
.setThumbnail(kişi.user.avatarURL)
.addField(`**Kullanıcı:**`, kişi,)
.addField(`Yetkili`, `<@${message.author.id}>`,)
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)
.setTimestamp()

const embed2 = new Discord.RichEmbed()
.setColor('GREEN')
.setDescription(`${kişi} adlı kullanıcı \`${zaman}\`lığına hapise yollandı!`)
  
kişi.addRole('757836941168476220'); //JAİL ROLÜ İD
kişi.roles.forEach(r => {
kişi.removeRole(r.id)
db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )
})  
client.channels.get('757834681180880907').send(hapis) //Jaile Girince Log Mesajı Hangi Kanala Gidicekse O Kanalın İDSİ.
kişi.send(dm) 
message.channel.send(embed2)
setTimeout(async () =>{
kişi.removeRole('757836941168476220') //Alınacak ROL İD
client.channels.get('757834681180880907').send(tahliye) //Jailden Çıkınca Log Mesajı Hangi Kanala Gidicekse O Kanalın İDSİ.
}, ms(zaman));
setTimeout(async () =>{
message.guild.roles.forEach(async r => {
const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
if(i != r.id)  return ;
if(i){kişi.addRole(i)}
})
}, ms(zaman));
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['hapset'],
permLevel: 0
};  
exports.help = {
name: 'jail',
description: 'Bir kullanıcıyı hapise atmaya yarar.',
usage: 'jail'
};
