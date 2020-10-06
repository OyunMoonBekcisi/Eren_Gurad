const Discord = require('discord.js');
exports.run = function(client, message, args) {
    if (!message.member.roles.find("name", "Owner")) {
        return message.channel.send(' **<a:carpi:756951404827901954> Bu Komutu Kullanmak için** \*`Owner*\` **Rolüne Sahip Olman Lazım <a:carpi:756951404827901954>** ')
            .then(m => m.delete(5000));
    } if(!args[0]) return message.channel.send(" **Lütfen Silinicek Mesaj Miktarını Yazın.!** ");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(` ${args[0]} Adet Mesajı Sildim. <a:onay:756111063295983706>`).then(msg => msg.delete(5000));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};
