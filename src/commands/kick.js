import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from '../messages/embeds'

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')
	.addUserOption(option => option.setName('member').setDescription('Select a user').setRequired(true))
	.addStringOption(option => option.setName('reason').setDescription('Write a kick reason').setRequired(false))

export async function execute(interaction) {
	const member = interaction.options.getMember('member')
	const reason = interaction.options.getMember('reason')
	member?.kick(reason)
	await interaction.reply({embeds: [info('Pong!', '', '', '', '')]})
}