import axios from 'axios'
import { ICommand } from 'wokcommands'
import DJS from 'discord.js'

export default {
	category: 'NSFW',
	description: 'Replies with a hentai image.',

	minArgs: 1,
	expectedArgs: '<string>',
	expectedArgsTypes: ['STRING'],

	slash: true,
	testOnly: false,

	cooldown: '20s',

	options: [
		{
			name: 'search',
			description: 'Search an anime by its name.',
			type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
			options: [
				{
					name: 'name',
					description: 'Enter a name of an anime.',
					required: false,
					type: DJS.Constants.ApplicationCommandOptionTypes.STRING
				},
			]
		},
	],

	callback: async ({ interaction, channel, message }) => {
		const encodedParams = new URLSearchParams()
		encodedParams.append('title', '<REQUIRED>')
		encodedParams.append('accessToken', '<REQUIRED>')
		encodedParams.append('body', '<REQUIRED>')

		const options = {
			method: 'POST',
			url: 'https://anilistmikilior1v1.p.rapidapi.com/createThread',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Key': '117404812bmshe41fc7eac1bd5a0p1e7a7ejsn48fad5204ffc',
				'X-RapidAPI-Host': 'Anilistmikilior1V1.p.rapidapi.com'
			},
			data: encodedParams
		}

		axios.request(options).then(function (response) {
			console.log(response.data)
		}).catch(function (error: any) {
			console.error(error)
		})
	}
} as ICommand