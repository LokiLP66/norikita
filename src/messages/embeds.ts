import { MessageEmbed } from 'discord.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { colours } = require('../data/config.json')

const footerName = 'by Kamachi#6622'
const footerURL = 'https://cdn.discordapp.com/avatars/655423421110550558/a_f25351f243575fb8a92f246d8302529a.png'

export function info(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor(colours.blue)
		.setDescription(cont)
		.setTimestamp()
		.setFooter(footerName, footerURL)
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

export function nsfw(cont: string, title: string, url: string, thumb: string, img: string) {
	const emb = new MessageEmbed()
		.setColor('#C0392B')
		.setDescription(cont)
		.setTimestamp()
		.setFooter(footerName, footerURL)
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
		.setFooter(footerName, footerURL)
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
		.setFooter(footerName, footerURL)
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
		.setFooter(footerName, footerURL)
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
		.setFooter(footerName, footerURL)
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