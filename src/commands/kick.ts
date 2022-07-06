/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from '../messages/embeds'

export const data = new SlashCommandBuilder()
	.setName('kick')
	.setDescription('Kick a specific user.')
	.addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))

export async function execute(interaction: CommandInteraction) {
	const target = interaction.options.getUser('target')
	if (!target) {
		await interaction.reply({embeds: [info('Error', 'No target specified!', '', '', '')]})
		return
	}
	const member = interaction.guild?.members.cache.get(target.id)
 	if (!member) {
 		await interaction.reply({embeds: [info('Error', 'Target not found!', '', '', '')]})
 		return
 	}
	await member.kick()
	await interaction.reply({embeds: [info('Success', 'User kicked!', '', '', '')]})
}