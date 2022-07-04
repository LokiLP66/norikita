import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from './../messages/embeds'

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')

export async function execute(interaction: CommandInteraction) {
	await interaction.reply({embeds: [info('Ping!', '', '', '', '')]})
}

