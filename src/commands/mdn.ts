import { ICommand } from 'wokcommands'
import axios from 'axios'
import { MessageEmbed } from 'discord.js'

export default {
	category: 'Help',
	description: 'Searches the official MDN documentation.',

	slash: 'both',

	testOnly: false,
	guildOnly: false,

	minArgs: 1,
	expectedArgs: '<search-query>',

	callback: async ({ text }) => {
		const base = 'https://developer.mozilla.org'
		const uri = `${base}/api/search?q=${encodeURIComponent(
			text
		)}&locale=en-US`
        
		const documents = (await axios.get(uri)).data.documents

		if (documents) {
			const emb = new MessageEmbed()
				.setAuthor({
					name: 'MDN Documentation',
					iconURL: 'https://avatars.githubusercontent.com/u/7565578?s=200&v=4',
				})
				.setColor('#2296f3')

			let truncated = false

			if (documents.length > 3) {
				documents.length = 3
				truncated = true
			}

			// eslint-disable-next-line prefer-const
			for (let { mdn_url, title, summary } of documents) {
				summary = summary.replace(/(\r\n|\n|\r)/gm, '')
				emb.addField(title, `${summary}\n[**LINK**](${base}${mdn_url})`)
			}

			if (truncated) {
				emb.addField(
					'Too many results!',
					`View more results [here](https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(
						text
					)}).`
				)
			}

			return emb
		}

		return 'Could not find that documentation.'
	}
} as ICommand
