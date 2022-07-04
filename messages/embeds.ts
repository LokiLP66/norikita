import { MessageEmbed } from 'discord.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { colours } = require('../data/config.json')

export function info(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor(colours.blue)
		.setDescription(cont)
		.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' })
	if (title) {
		emb.setTitle(title)
	}
	if (url) {
		emb.setURL(url)
	}
	if (thumb) {
		emb.setThumbnail(thumb)
	}
	if (img) {
		emb.setImage(img)
	}
	return emb
}

export function error(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor(colours.red)
		.setDescription(cont)
		.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' })
	if (title) {
		emb.setTitle(title)
	}
	if (url) {
		emb.setURL(url)
	}
	if (thumb) {
		emb.setThumbnail(thumb)
	}
	if (img) {
		emb.setImage(img)
	}
	return emb
}

export function succes(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor(colours.green)
		.setDescription(cont)
		.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' })
	if (title) {
		emb.setTitle(title)
	}
	if (url) {
		emb.setURL(url)
	}
	if (thumb) {
		emb.setThumbnail(thumb)
	}
	if (img) {
		emb.setImage(img)
	}
	return emb
}

export function mod(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor(colours.orange)
		.setDescription(cont)
		.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' })
	if (title) {
		emb.setTitle(title)
	}
	if (url) {
		emb.setURL(url)
	}
	if (thumb) {
		emb.setThumbnail(thumb)
	}
	if (img) {
		emb.setImage(img)
	}
	return emb
}

export function log(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor(colours.yellow)
		.setDescription(cont)
		.setFooter({ text: 'Ichiro#6612', iconURL: 'https://cdn.discordapp.com/app-icons/829257090673279006/dc4311dc30020f015d52ffbf47e59e0d.png?size=256' })
	if (title) {
		emb.setTitle(title)
	}
	if (url) {
		emb.setURL(url)
	}
	if (thumb) {
		emb.setThumbnail(thumb)
	}
	if (img) {
		emb.setImage(img)
	}
	return emb
}