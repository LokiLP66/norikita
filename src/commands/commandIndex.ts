/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
export * as ping from './ping'
export * as ticket from './ticket'
export * as help from './help'
export * as kick from './kick'

//
// create a function to ban a user
// export async function execute(interaction: CommandInteraction) {
// 	const target = interaction.args[0]
// 	if (!target) {
// 		await interaction.reply({embeds: [info('Error', 'No target specified!', '', '', '')]})
// 		return
// 	}
// 	const member = interaction.guild.members.cache.get(target)
// 	if (!member) {
// 		await interaction.reply({embeds: [info('Error', 'Target not found!', '', '', '')]})
// 		return
// 	}
// 	await member.ban()
// 	await interaction.reply({embeds: [info('Success', 'User banned!', '', '', '')]})
// }
//
//
// create a function to unban a user
// export async function execute(interaction: CommandInteraction) {
// 	const target = interaction.args[0]
// 	if (!target) {
// 		await interaction.reply({embeds: [info('Error', 'No target specified!', '', '', '')]})
// 		return
// 	}
// 	const member = interaction.guild.members.cache.get(target)
// 	if (!member) {
// 		await interaction.reply({embeds: [info('Error', 'Target not found!', '', '', '')]})
// 		return
// 	}
// 	await member.unban()
// 	await interaction.reply({embeds: [info('Success', 'User unbanned!', '', '', '')]})
// }
//
//
// create a function to mute a user
// export async function execute(interaction: CommandInteraction) {
// 	const target = interaction.args[0]
// 	if (!target) {
// 		await interaction.reply({embeds: [info('Error', 'No target specified!', '', '', '')]})
// 		return
// 	}
// 	const member = interaction.guild.members.cache.get(target)
// 	if (!member) {
// 		await interaction.reply({embeds: [info('Error', 'Target not found!', '', '', '')]})
// 		return
// 	}
// 	await member.roles.add(interaction.guild.roles.cache.get('Muted'))
// 	await interaction.reply({embeds: [info('Success', 'User muted!', '', '', '')]})
// }
//
//
// create a function to unmute a user
// export async function execute(interaction: CommandInteraction) {
// 	const target = interaction.args[0]
// 	if (!target) {
// 		await interaction.reply({embeds: [info('Error', 'No target specified!', '', '', '')]})
// 		return
// 	}
// 	const member = interaction.guild.members.cache.get(target)
// 	if (!member) {
// 		await interaction.reply({embeds: [info('Error', 'Target not found!', '', '', '')]})
// 		return
// 	}
// 	await member.roles.remove(interaction.guild.roles.cache.get('Muted'))
// 	await interaction.reply({embeds: [info('Success', 'User unmuted!', '', '', '')]})
// }


