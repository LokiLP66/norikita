import { Client } from 'discord.js'

export default (client: Client) => {
	client.on('interactionCreate', (interaction) => {
		if (!interaction.isModalSubmit()) return
		if (interaction.customId == 'ping_modal') {
			const title = interaction.fields.getTextInputValue('title')
			const cont = interaction.fields.getTextInputValue('cont')
			interaction.channel?.send({ content: `${title}: ${cont}` })
		} else {
			return
		}
	})
}

export const config = {
	displayName: 'Modal Handler',
	dbName: 'MODAL_HANDLER',
}