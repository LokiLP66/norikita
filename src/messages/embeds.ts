import { MessageEmbed } from 'discord.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { colours } = require('../data/config.json')

export function info(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor(colours.blue)
		.setDescription(cont)
		.setTimestamp()
		.setFooter('by LokiLP66#6622', 'https://cdn.discordapp.com/avatars/655423421110550558/390a773e7558738d43be2f6555d46402.png')
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
		.setTimestamp()
		.setFooter('by LokiLP66#6622', 'https://cdn.discordapp.com/avatars/655423421110550558/390a773e7558738d43be2f6555d46402.png')
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
		.setTimestamp()
		.setFooter('by LokiLP66#6622', 'https://cdn.discordapp.com/avatars/655423421110550558/390a773e7558738d43be2f6555d46402.png')
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
		.setTimestamp()
		.setFooter('by LokiLP66#6622', 'https://cdn.discordapp.com/avatars/655423421110550558/390a773e7558738d43be2f6555d46402.png')
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
		.setTimestamp()
		.setFooter('by LokiLP66#6622', 'https://cdn.discordapp.com/avatars/655423421110550558/390a773e7558738d43be2f6555d46402.png')
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