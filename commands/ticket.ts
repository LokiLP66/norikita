import { Client, CommandInteraction, TextChannel } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from './../messages/embeds'

export const data = new SlashCommandBuilder()
	.setName('ticket')
	.setDescription('Creates a new help ticket.')
	.addStringOption(option => option
		.setName('description')
		.setDescription('Describe your problem')
		.setRequired(true)
	)

export async function execute(interaction: CommandInteraction, client: Client) {
	if (!interaction?.channelId) {
		return
	}
	const channel = await client.channels.fetch(interaction.channelId)
	if (!channel || channel.type != 'GUILD_TEXT') {
		return
	}
	const thread = await (channel as TextChannel).threads.create({
		name: `support-${Date.now()}`,
		reason: `Support ticket ${Date.now()}`
	})
	const problemDescription = interaction.options.getString('description')!
	const { user } = interaction
	thread.send(`**User:** ${user}\n**Problem:** ${problemDescription}`)

	//TODO: create the ticket and store it in the firestore

	return interaction.reply({
		embeds: [info('Help is on the way', '', '', '', '')],
		ephemeral: true
	})
}