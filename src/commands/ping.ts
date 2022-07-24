/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { info, succes } from '../messages/embeds'
import { ICommand } from 'wokcommands'
import { Modal, SelectMenuComponent, showModal, TextInputComponent } from 'discord-modals'

export default {
	category: 'Test',
	description: 'Replies with the bot ping.',

	slash: true,
	testOnly: false,

	callback: async ({ interaction, client }) => {
		const modal = new Modal() // We create a Modal
			.setCustomId('modal-customid')
			.setTitle('Roles')
			.addComponents(
				new SelectMenuComponent() // We create a Select Menu Component
					.setCustomId('theme')
					.setPlaceholder('What theme of Discord do you like?')
					.addOptions(
						{
							label: 'Dark',
							description: 'The default theme of Discord.',
							value: 'dark',
							emoji: '⚫',
						},
						{
							label: 'Light',
							description: 'Some people hate it, some people like it.',
							value: 'light',
							emoji: '⚪',
						}
					)
			)

		showModal(modal, {
			client: client, // Client to show the Modal through the Discord API.
			interaction: interaction // Show the modal with interaction data.
		})
	}
} as ICommand
