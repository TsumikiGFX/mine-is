const Discord = require('discord.js')
const moment = require('moment')
moment.locale('fr')

module.exports = (user) => {
    let info = {
        username: null,
        discriminator: null,
        tag: null,
        id: null,
        avatar: null,
        badges: [],
        bot: null,
        created: null,
        status: null,
        connected: []
    }
    if(user.guild) user = user.user
    info.username = user.username ? user.username : "????"
    info.discriminator = user.discriminator ? user.discriminator : "0000"
    info.tag = `${user.username ? user.username : "????"}#${user.discriminator ? user.discriminator : "0000"}`
    info.id = user.id ? user.id : "000000000000000000"
    info.avatar = `https://cdn.discordapp.com/avatars/${user.id ? user.id : "000000000000000000"}/${user.avatar ? user.avatar : "default"}.png`
    info.badges = convertUFB(user.flags.bitfield ? user.flags.bitfield : 0)
    info.bot = user.bot
    info.created = moment(user.createdTimestamp).format("L")
    info.status = user.presence.status
    if(user.presence.clientStatus.desktop) info.connected.push("PC")
    if(user.presence.clientStatus.mobile) info.connected.push("Mobile")
    if(user.presence.clientStatus.browser) info.connected.push("Web")
    return info
}

function convertUFB(bitfield) {
    if(!bitfield) throw "Missing Bitfield"
    if(isNaN(bitfield)) throw `${bitfield} is not a number`
    let processConvert = bitfield
    let UFConvertResult = []
    const ACFlags = Object.entries(Discord.UserFlags.FLAGS).sort(function(a,b) {
        return Number(b[1]) - Number(a[1]);
    })
    ACFlags.forEach(flag => {
        if(processConvert - flag[1] >= 0) {
            UFConvertResult.push(flag[0])
            processConvert = processConvert - flag[1]
        }
    })
    return UFConvertResult
}