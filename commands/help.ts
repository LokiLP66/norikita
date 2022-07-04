import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from './../messages/embeds'
import * as commandModules from './commandIndex'

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Displays all the commands the bot has.')

export async function execute(interaction: CommandInteraction) {
	await interaction.reply({embeds: [info('', '', '', '', '')]})
}

