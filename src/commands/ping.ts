import { info } from '../messages/embeds'
import { ICommand } from 'wokcommands'

export default {
	category: 'Test',
	description: 'Replies with the bot ping.',

	slash: 'both',
	testOnly: false,

	callback: async ({ channel }) => {
		await channel.send({embeds: [info('Pong!', '', '', '', '')]})
	}
} as ICommand
