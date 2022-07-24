import { ICommand } from 'wokcommands'
import { info } from '../messages/embeds'

export default {

	category: 'Configuration',
	description: 'Sets the bots status',

	minArgs: 1,
	expectedArgs: '<text>',

	slash: true,

	testOnly: true,
	ownerOnly: true,
	hidden: true,

	callback: ({ client, channel, text }) => {
		client.user?.setPresence({
			status: 'dnd',
			activities: [
				{
					name: text,
				}
			],
		})

		channel.send({ embeds: [info('Status updated', 'Status', '', '', '')] })
	}

} as ICommand