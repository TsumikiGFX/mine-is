# Mine Informations Simplifier

`Mine Informations Simplifier` is a small library that simplify the research of informations for your Discord bot.
⚠️ Only work with [Discord.JS](https://www.npmjs.com/package/discord.js) library.

# Installation

Use [npm](https://www.npmjs.com/) manager to install `Mine Informations Simplifier`.
Make sure to have [discord.js](https://www.npmjs.com/package/discord.js) installed too.

```bash
npm install mine-is
```
or
```bash
npm i mine-is
```

# Usage

For the [v1.0.4](https://www.npmjs.com/package/mine-is/v/1.0.4) only bot and user informations are available.

```js
const Discord = require("discord.js")
const bot = new Discord.Client()
const mineIS = require("mine-is")

mineIS.informations.bot(Discord, bot) // return all bot informations in an Object
mineIS.informations.user(message.author) // return all user informations in an Object
```

# Contributing

If there is a problem with the library or you want to contribute the library, send me a DM on Discord to `Tsumiki#0001`.

# License

MIT
