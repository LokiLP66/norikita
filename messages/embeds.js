const { MessageEmbed } = require('discord.js');
const { colours } = require('../data/config.json')

module.exports = {
    info(title, cont) {
        const emb = new MessageEmbed().setDescription(cont).setTitle(title).setColor(colours.blue);
        return emb
    },
    error(title, cont) {
        const emb = new MessageEmbed().setDescription(cont).setTitle(title).setColor(colours.red);
        return emb
    },
    succes(title, cont) {
        const emb = new MessageEmbed().setDescription(cont).setTitle(title).setColor(colours.green);
        return emb
    },
    mod(title, cont) {
        const emb = new MessageEmbed().setDescription(cont).setTitle(title).setColor(colours.orange);
        return emb
    },
    log(title, cont) {
        const emb = new MessageEmbed().setDescription(cont).setTitle(title).setColor(colours.yellow);
        return emb
    }
}