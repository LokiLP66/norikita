import { error, info, succes } from '../../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS, { Client, MessageAttachment, TextChannel } from 'discord.js'
import { Modal, showModal, TextInputComponent } from 'discord-modals'

export default {
	category: 'Servers',
	description: 'Sends a message to a channel.',

	permissions: ['ADMINISTRATOR'],

	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<channel>',
	
	options: [
		{
			name: 'channel',
			description: 'Please tag a channel for the message.',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
		},
	],

	slash: 'both',

	testOnly: false,
	guildOnly: true,

	init: (client: Client) => {
		client.on('interactionCreate', (modalSubmit) => {
			if (!modalSubmit.isModalSubmit()) return
			if (modalSubmit.customId == 'send_modal') {
				const title = modalSubmit.fields.getTextInputValue('title')
				const cont = modalSubmit.fields.getTextInputValue('cont')
				modalSubmit.channel?.send({ embeds: [info(cont, title, '', '', '')] })
			}
		})
	}, 

	callback: async ({ interaction, client }) => {
		const chan = interaction.options.getChannel('channel') as TextChannel
		// We create a Modal
		const modal = new Modal()
			.setCustomId('send_modal')
			.setTitle('Message Information')

		// TextInput: title

		const titleInput = new TextInputComponent()
			.setCustomId('title')
			.setLabel('Title')
			.setStyle('SHORT')
			.setPlaceholder('Write the message title here!')
			.setRequired(true)
			.setMaxLength(100)

		// TextInput: content

		const contInput = new TextInputComponent()
			.setCustomId('cont')
			.setLabel('Content')
			.setStyle('LONG')
			.setPlaceholder('Write the message content here!')
			.setRequired(true)
			.setMaxLength(2000)

		// add components to modal

		modal.addComponents(
			titleInput,
			contInput
		)
		// show modal

		showModal(modal, {
			client: client,
			interaction: interaction
		})

		if (!chan || chan.type !== 'GUILD_TEXT') {
			interaction.reply({ embeds: [error('Please tag a text channel.', 'Error', '', '', '')] })
		}
	}
} as ICommand