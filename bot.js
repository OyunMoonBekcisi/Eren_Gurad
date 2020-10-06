const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');//lrowsxrd
const chalk = require('chalk');//lrowsxrd
const fs = require('fs');//lrowsxrd
const moment = require('moment');
const db = require('quick.db');
require('./util/eventLoader')(client);
//lrowsxrd
var prefix = ayarlar.prefix;
//lrowsxrd
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
//lrowsxrd
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
//lrowsxrd
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
//lrowsxrd
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
//lrowsxrd
client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
//lrowsxrd
client.login(ayarlar.token);
//lrowsxrd
// EVERYONE VE HERE \\ //lrowsxrd
let ehengel = JSON.parse(
  fs.readFileSync("./ayarlar/everhereengel.json", "utf8")
);
client.on("message", async function(msg) {
  if (!msg.guild) {
  } else {
    if (!ehengel[msg.guild.id]) {
    } else {
      if (ehengel[msg.guild.id].sistem == false) {
      } else if (ehengel[msg.guild.id].sistem == true) {
        if (msg.member.roles.find("name", "BURAYA EVERYONE ATABİLECEK ROLÜN İSMİNİ GİRİNİZ!")) {
        } else {
          if (msg.content.includes("@everyone")) {
            msg.delete();
            msg
              .reply("Bu Sunucuda @everyone atmak yasaklanmıştır!")
              .then(msj => msj.delete(3200));
          } else {
          }
          if (msg.content.includes("@here")) {
            msg.delete();
            msg
              .reply("Bu Sunucuda @here atmak yasaklanmıştır!")
              .then(msj => msj.delete(3200));
          } else {
          }
        }
      }
    }
  }
});
// EVERYONE VE HERE \\

// CAPSLOCK \\

    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

// CAPSLOCK \\

// CHAT LOG \\
client.on("messageDelete", async message => {
  if (message.author.bot) return;

  var yapan = message.author;
//lrowsxrd
  var kanal = await db.fetch(`chatlog_${message.guild.id}`);
  if (!kanal) return;
  var kanalbul = message.guild.channels.find("name", kanal);
//lrowsxrd
  const chatembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, yapan.avatarURL)
    .addField("Kullanıcı Tag", yapan.tag, true)
    .addField("ID", yapan.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(yapan.avatarURL);
  kanalbul.send(chatembed);
});
//lrowsxrd
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  var yapan = oldMsg.author;

  var kanal = await db.fetch(`chatlog_${oldMsg.guild.id}`);
  if (!kanal) return;
  var kanalbul = oldMsg.guild.channels.find("name", kanal);
//lrowsxrd
  const chatembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, yapan.avatarURL)
    .addField("Kullanıcı Tag", yapan.tag, true)
    .addField("ID", yapan.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(yapan.avatarURL);
  kanalbul.send(chatembed);
});
// CHAT LOG \\
//lrowsxrd
// BOT DM LOG \\
client.on("message", message => {
    const dmchannel = client.channels.find("name", "CHANNEL ID KOYMANIZ YETERLİ //lrowsxrd");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});
// BOT DM LOG \\
//lrowsxrd
// REKLAM \\
client.on("message", async message => {
    if (message.member.roles.find("name", "Owner")) return;
    let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
    if (!links) return;
    if (message.deletable) message.delete();
    message.channel.send(`Hey ${message.author}, sunucuda link paylaşamazsın!`)
})
// REKLAM \\
//lrowsxrd
//--------------------------------------ROL-BOT KORUMA-----------------------------------------//
client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(`**${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum  :white_check_mark:`)

  
}
}) 
//lrowsxrd


client.on("guildMemberAdd", async member => {
  if (db.has(`botkoruma_${member.guild.id}`) === false) return;
  if (member.user.bot === false) return;
  if (db.has(`botİzinli_${member.id}`) === true) return;
  
  member.kick(member, `Bot Koruması Aktif!`)
  
  member.guild.owner.send(`Sunucunuza Bir Bot Eklendi ve Sunucudan Otomatik Olarak Atıldı, Sunucuya Eklenmesini Onaylıyor iseniz \`!giriş-izni ${member.id}\``)
  })

// BAN LİMİT \\
client.on("guildBanAdd", async(guild, user) => {
   if(guild.id !== "755381396876427354") return; //ID kısmına sunucu ID'nizi giriniz.
const banlayan = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
let banlayancek = guild.members.get(banlayan.exucutor.id)
if(banlayancek.bot) return;    
    
 let banlar = await db.fetch(`banlayaninbanlari_${banlayancek.id}`)    
 if(!banlar) {
   db.set(`banlayaninbanlari_${banlayancek.id}`, 1)
 return;
 }
  
let limit = "3" // 3 kısmına ban limitinin kaç olmasını istiyorsanız yazınız.
  if(banlar >= limit) {
guild.member.kick(user,{reason: "Atıldınız. (Ban limitinizi aştınız.)"})    
db.delete(`banlayaninbanlari_${banlayancek.id}`)
return;      
  } 

 db.add(`banlayaninbanlari_${banlayancek.id}`, 1)
    })
// BAN LİMİT \\

// GÖRSEL \\
client.on("message", m => {

let kanal = m.guild.channels.find('name', 'LOG ADI YAZILICAK'); // uyari yerine kanal adınızı yazınız.

let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`${m.author}, kanal adı kanalına resim harici bir şey göndermek yasak olduğundan dolayı mesajınız silindi.`)
.setTimestamp()
 
  if (m.author.id === m.guild.ownerID) return;
 if (m.channel.id !== "GORSEL KANALININ ID SI") { // Buraya o kanalın ID'si yazılacaktır.
    return;
  }
  if (m.author.id === m.guild.ownerID) return;
  if (m.attachments.size < 1) {
    m.delete().then(kanal.send(embed));
  }
});
// GÖRSEL \\


// SELF-BOT KORUMA LROWSXRD \\

client.on('message', message => {
  var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`)
  if(!antiraid) return;
  if(message.author.bot) return;
  message.guild.fetchMember(message.author).then(member => {
  if(member.hasPermission('BAN_MEMBERS')) return;
  var b = []
  var aut = []
  setTimeout(() => {
  message.channel.fetchMessages({ limit: 10 }).then(m => {
  m.forEach(a => {
  if(m.filter(v => v.content === a.content).size > m.size / 2) {
  message.guild.fetchMember(m.author).then(member2 => {
  if(member2.hasPermission('BAN_MEMBERS')) return;
  b.push(a)
  aut.push(a.author)
  })}})
  if(!b.includes(":warning: | `Self` Botlar Susturulacak.")) { işlem() }
  else {}

  function işlem() {

  if(b.length > 5) {
    message.channel.send(':warning: | `Self` Botlar Susturulacak.')
    aut.forEach(a => {
      message.channel.overwritePermissions(a, {
        "SEND_MESSAGES": false
      })
    })
    message.channel.send( ' | `Self` botlar susturuldu.')
  } else return;
  }//lrowsxrd
  })})})})

client.on("ready", () => {
  client.channels.get("757261792278741123").join();
   //main dosyaya atılacak
})
