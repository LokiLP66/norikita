import { Client } from 'discord.js'

export default (client: Client) => {
	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isContextMenu()) return
		console.log(interaction)
	})
}

export const config = {
	displayName: 'Context Menu Handler',
	dbName: 'CONTEXT_MENU_HANDLER',
}