import { succes } from '../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS, { TextChannel } from 'discord.js'

export default {
	category: 'Test',
	description: 'Replies with the bot ping.',

	slash: true,
	testOnly: false,

	ownerOnly: true,
	hidden: true,

	minArgs: 1,
	expectedArgs: '<commandid>',

	options: [
		{
			name: 'commandid',
			description: 'Enter a commandId',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING
		},
	],

	callback: async ({ interaction, client, channel }) => {
		const commandId = interaction.options.getString('commandid') as string
		const chan = channel as TextChannel

		if (interaction.options.getString('commandid') == 'all') {
			client.application?.commands.cache.forEach(command => {
				client.application?.commands.fetch(command.id)
					.then( async (command) => {
						await chan.send({embeds: [succes(`Succesfully fetched command: ${command.name}`, 'Succes', '', '', '')]})
						// further delete it like so:
						command.delete()
						await chan.send({embeds: [succes(`Succesfully deleted command: ${command.name}`, 'Succes', '', '', '')]})
					}).catch(console.error)
			})
			await chan.send({embeds: [succes('Succesfully deleted all commands', 'Succes', '', '', '')]})
		}
		else {
			client.application?.commands.fetch(commandId) // id of your command
				.then( async (command) => {
					await chan.send({embeds: [succes(`Succesfully fetched command: ${command.name}`, 'Succes', '', '', '')]})
					// further delete it like so:
					command.delete()
					await chan.send({embeds: [succes(`Succesfully deleted command: ${command.name}`, 'Succes', '', '', '')]})
				}).catch(console.error)
		}
	}
} as ICommand