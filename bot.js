const cpuStat = require('cpu-stat')
const os = require('os')
const fs = require('fs')
const gpu = require('gpu-info')
let cpuUsage = null
let gpus = []

cpuStat.usagePercent(function (err, percent, seconds) {
    cpuUsage = percent
})

gpu().then(data => {
    data.forEach(gpu => gpus.push(gpu.Name))
})

module.exports = (Discord, bot) => {
    let info = {
        name: null,
        id: null,
        host: {
            cpu: {
                name: null,
                usage: null,
                cores: null
            },
            memory: {
                usage: null,
                total: null,
                type: {
                    base: null,
                    full: null
                }
            },
            gpu: [],
            arch: null,
            platform: null,
            version: null
        },
        node: null,
        discordjs: null,
        ping: null
    }
    info.name = bot.user.username
    info.id = bot.user.id
    info.host.cpu.name = os.cpus().map(c => c.model)[0]
    info.host.cpu.usage = cpuUsage.toFixed(2)
    info.host.cpu.cores = cpuStat.totalCores()
    info.host.memory.usage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    info.host.memory.total = (os.totalmem() / 1024 / 1024).toFixed(2)
    info.host.memory.type.base = "MB"
    info.host.memory.type.full = "megabytes"
    info.host.gpu = gpus
    info.host.arch = os.arch()
    info.host.platform = os.platform()
    info.host.version = `${os.type()} ${os.release()}`
    info.node = process.version
    info.discordjs = Discord.version
    info.ping = bot.ws.ping
    return info
}