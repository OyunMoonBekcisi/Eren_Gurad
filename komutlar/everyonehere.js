const Discord = require("discord.js");
const fs = require('fs');//lrowsxrd
exports.run = (client, msg, args) => {
   if(!msg.member.roles.has("756416369767088130")) {
    msg.reply("Bu Komutu Kullanmak İçin Yeterli Yetkin Yok!")
  } else {
    if(!args[0]) {//lrowsxrd
      msg.reply("lütfen `aç` veya `kapat` şeklinde bir ayar giriniz.")
    } else {
      if(!["aç", "kapat"].includes(args[0])) {
        msg.reply("lütfen sadece `aç` veya `kapat` şeklinde bir ayar giriniz.")
      } else {//lrowsxrd
        if(args[0] == "aç") {
          try {
            let dosya = JSON.parse(fs.readFileSync('./ayarlar/everhereengel.json', 'utf8'));
            dosya[msg.guild.id] = {
              sistem: true//lrowsxrd
            }
            fs.writeFile('./ayarlar/everhereengel.json', JSON.stringify(dosya), (err) => {
              if(err) throw err;
            })
            msg.reply("sistem başarıyla açıldı ☑️");
          } catch (e) {
            console.log(e);
          }//lrowsxrd
        } else if(args[0] == "kapat") {
          try {
            let dosya = JSON.parse(fs.readFileSync('./ayarlar/everhereengel.json', 'utf8'));
            dosya[msg.guild.id] = {
              sistem: false
            }
            fs.writeFile('./ayarlar/everhereengel.json', JSON.stringify(dosya), (err) => {
              if(err) throw err;
            })
            msg.reply("sistem başarıyla kapatıldı ❌");
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  }
}//lrowsxrd
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["everyone-here"],
  permLevel: 0
};
exports.help = {
  name: "eh-engel",
  description: "lrowsxrd",
  usage: "lrowsxrd"
};