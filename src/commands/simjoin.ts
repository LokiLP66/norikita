import { succes } from '../messages/embeds'
import { ICommand } from 'wokcommands'

export default {
	category: 'Simulation',
	description: 'Simulates a user joining the server.',

	slash: 'both',
	
	testOnly: false,
	hidden: true,

	permissions: ['ADMINISTRATOR'],

	callback: async ({ client, member, channel }) => {
		client.emit('guildMemberAdd', member)
		channel.send({ embeds: [succes('Succesfully simululated a user joining the guild', 'Succes', '', '', '')] })
	}
} as ICommand