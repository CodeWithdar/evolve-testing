const { Permissions, MessageEmbed } = require ("discord.js")

const db = require ("quick.db")

let wrong = "#F04A47"
let right = "#43B581"

module.exports = {
    name : "warn",
    description : "warns a user with reason and storing the total warns",
    usage : "warm <user> <reason>",
    timeout : "4000",
    category : "moderaton",
    run : async (client, message, args) =>{
        try{

            const check = client.emojis.cache.find(x => x.name === "CheckMark")
            const cross = client.emojis.cache.find(x => x.name === "WrongMark")
            const embed = new MessageEmbed()
            .setDescription(`**${cross}**`)
            .setColor(wrong)
            return message.channel.send({embeds : [embed]})

            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBER)){
                const check = client.emojis.cache.find(x => x.name === "CheckMark")
                const cross = client.emojis.cache.find(x => x.name === "WrongMark")
                const embed = new MessageEmbed()
                .setDescription(`**${cross} Missing KICK MEMBER permissions**`)
                .setColor(wrong)
                return message.channel.send({embeds : [embed]})

            }

            const target = message.mentions.users.first()
            if(!target  ){
                const check = client.emojis.cache.find(x => x.name === "CheckMark")
                const cross = client.emojis.cache.find(x => x.name === "WrongMark")
                const embed = new MessageEmbed()
                .setDescription(`**${cross} You must mention the user to warn**`)
                .setColor(wrong)
                return message.channel.send({embeds : [embed]})

            }

            if(target.bot){
               
                const embed = new MessageEmbed()
                .setDescription(`**${cross} You must mention the user to warn**`)
                .setColor(wrong)
                return message.channel.send({embeds : [embed]})

            }
            
            if (target.id === message.author.id){
                const embed = new MessageEmbed()
                
                .setDescription(`**${cross} Sorry but you cannot warn yourself**`)
                .setColor(wrong)
                return message.channel.send({embeds : [embed]})

            }

            if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1){
                const embed = new MessageEmbed()
                
                .setDescription(`**${cross} The member you are trying to warn has higher role than you!**`)
                .setColor(wrong)
                return message.channel.send({embeds : [embed]})

            }

            let reason =args.slice(1).join(" ")

            if(!reason){
                const embed = new MessageEmbed()
                .setDescription(`**${cross} Please provide a valid reason to warn that member**`)
                .setColor(wrong)
                return message.channel.send({embeds : [embed]})
            }
            
            db.add(`warns_${target.id}`, 1)
            let x = db.get(`warns_${target.id}`)
            const embeds = new MessageEmbed()
            .setDescription(`**${check} ${target.id} has been warned with ${x} now**`)
            .setColor(right)
            message.channel.send({embeds : [embed]})
            

            try{

                let embed = new MessageEmbed()
                .setDescription(`:warning: You have been warned in ${message.guild.name} by ${message.author.username}`)
                .setFooter(`Reason- ${reason}`)
                .setColor("FFFF00")
                target.send({embeds : [embed]})
            }catch(err){
                const embed = new MessageEmbed()
                .setDescription(`**${cross} I cannot send message to that user**`)
                .setColor(wrong)
                return message.channel.send({embeds : [embed]})
            }

        }catch (err) {
            console.log(err)
            const embed = new MessageEmbed()
            .setDescription(`**${cross} An unknown error occoured**`)
            .setColor(wrong)
            return message.channel.send({embeds : [embed]})

        }
    }
    }