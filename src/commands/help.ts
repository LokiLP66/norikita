/* eslint-disable no-unsafe-optional-chaining */
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from '../messages/embeds'

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Sends a help to all commands.')

export async function execute(interaction: CommandInteraction) {
	const emb = info('Help', 'Here is a list of all commands.', '', '', '')
		.set
}
