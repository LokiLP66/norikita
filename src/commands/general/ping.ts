/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { info, succes } from '../../messages/embeds'
import { ICommand } from 'wokcommands'
import { Modal, SelectMenuComponent, showModal, TextInputComponent } from 'discord-modals'

export default {
	category: 'Test',
	description: 'Replies with the bot ping.',

	slash: true,
	testOnly: false,
	guildOnly: true,

	callback: async ({ interaction, client, guild }) => {
		// We create a Modal
		const modal = new Modal()
			.setCustomId('ping_modal')
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
	}
} as ICommand
