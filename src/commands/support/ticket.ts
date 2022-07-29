import { info } from '../../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS, { TextChannel } from 'discord.js'

export default {
	category: 'Server',
	description: 'Creates a new help ticket.',

	slash: true,
	testOnly: false,

	minArgs: 1,
	expectedArgs: '<description>',

	options: [
		{
			name: 'description',
			description: 'Describe your problem.',
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING
		},
	],

	callback: async ({ interaction, channel, message }) => {
		if (!channel.id) {
			return
		}
		if (!channel || channel.type != 'GUILD_TEXT') {
			return
		}
		const thread = await (channel as TextChannel).threads.create({
			name: `support-${Date.now()}`,
			reason: `Support ticket ${Date.now()}`
		})
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const problemDescription = message ? message.content.replace('!ticket ', ' ') : interaction.options.getString('description')!
		const { user } = interaction
		thread.send({ embeds: [info(`**User:** ${user}\n**Problem:** ${problemDescription}`, '', '', '', '')] })
	}
} as ICommand
