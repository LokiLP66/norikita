/* eslint-disable no-unsafe-optional-chaining */
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { info } from '../messages/embeds'

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Sends a help to all commands.')

export async function execute(interaction: CommandInteraction) {
	const embed = info('Help', '', '', '', '')
		.addField('ping', 'Replies with Pong!')
		.addField('kick', 'Kick a specific user.')
		.addField('mute', 'Mute a specific user.')
		.addField('unmute', 'Unmute a specific user.')
		.addField('ban', 'Ban a specific user.')
		.addField('unban', 'Unban a specific user.')
		.addField('purge', 'Purge a specific amount of messages.')
		.addField('say', 'Make the bot say something.')
		.addField('warn', 'Warn a specific user.')
		.addField('unwarn', 'Unwarn a specific user.')
		.addField('warnings', 'Show a specific user\'s warnings.')
		.addField('help', 'Show this help message.')
	await interaction.reply({embeds: [embed]})
}
