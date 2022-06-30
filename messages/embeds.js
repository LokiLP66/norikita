const { MessageEmbed } = require('discord.js');
const { colours } = require('../data/config.json');

module.exports = {
	info(title, cont, url, thumb, img) {
		const emb = new MessageEmbed()
			.setColor(colours.blue)
			.setDescription(cont)
			.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' });
		if (title) {
			emb.setTitle(title);
		}
		if (url) {
			emb.setURL(url);
		}
		if (thumb) {
			emb.setThumbnail(thumb);
		}
		if (img) {
			emb.setImage(img);
		}
		return emb;
	},
	error(title, cont, url, thumb, img) {
		const emb = new MessageEmbed()
			.setColor(colours.red)
			.setDescription(cont)
			.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' });
		if (title) {
			emb.setTitle(title);
		}
		if (url) {
			emb.setURL(url);
		}
		if (thumb) {
			emb.setThumbnail(thumb);
		}
		if (img) {
			emb.setImage(img);
		}
		return emb;
	},
	succes(title, cont, url, thumb, img) {
		const emb = new MessageEmbed()
			.setColor(colours.green)
			.setDescription(cont)
			.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' });
		if (title) {
			emb.setTitle(title);
		}
		if (url) {
			emb.setURL(url);
		}
		if (thumb) {
			emb.setThumbnail(thumb);
		}
		if (img) {
			emb.setImage(img);
		}
		return emb;
	},
	mod(title, cont, url, thumb, img) {
		const emb = new MessageEmbed()
			.setColor(colours.orange)
			.setDescription(cont)
			.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' });
		if (title) {
			emb.setTitle(title);
		}
		if (url) {
			emb.setURL(url);
		}
		if (thumb) {
			emb.setThumbnail(thumb);
		}
		if (img) {
			emb.setImage(img);
		}
		return emb;
	},
	log(title, cont, url, thumb, img) {
		const emb = new MessageEmbed()
			.setColor(colours.yellow)
			.setDescription(cont)
			.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' });
		if (title) {
			emb.setTitle(title);
		}
		if (url) {
			emb.setURL(url);
		}
		if (thumb) {
			emb.setThumbnail(thumb);
		}
		if (img) {
			emb.setImage(img);
		}
		return emb;
	},
};