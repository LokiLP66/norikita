/* eslint-disable @typescript-eslint/no-explicit-any */
import { Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'

export default {

	category: 'Help',
	description: 'Replies with the help for the bot.',

	slash: 'both',
	testOnly: false,

	callback: async ({ instance, user, channel, prefix, message, interaction, client }) => {
		const embeds: MessageEmbed[] = []
		const pages = {} as { [key: string]: number }

		for (let a = 0; a < 1; ++a) {
			const entries = instance.categories.entries()
			// eslint-disable-next-line prefer-const
			for (let entry of entries) {
				const emb = new MessageEmbed()
					.setTitle(`${client.user?.username}s Help Menu`)
					.setDescription(`${entry[1]} ${entry[0]}`)
					.setColor('BLURPLE')
				instance.commandHandler.commands.forEach((command: any) => {
					if (command.category == entry[0]) {
						if (!interaction) {
							emb.addField(`${prefix}${command.names[0]}`, `${command.description}\n${command.syntax}`)
						} else {
							emb.addField(`/${command.names[0]}`, `${command.description}\n${command.syntax}`)
						}
					}
				})
				embeds.push(emb)
			}
		}

		const getRow = (id: string) => {
			const row = new MessageActionRow()
		
			row.addComponents(
				new MessageButton()
					.setCustomId('prev_embed')
					.setStyle('SECONDARY')
					.setEmoji('⬅')
					.setDisabled(pages[id] === 0)
			)
			row.addComponents(
				new MessageButton()
					.setCustomId('home_embed')
					.setStyle('SECONDARY')
					.setEmoji('🏠')
			)
			row.addComponents(
				new MessageButton()
					.setCustomId('next_embed')
					.setStyle('SECONDARY')
					.setEmoji('➡')
					.setDisabled(pages[id] === embeds.length - 1)
			)
		
			return row
		}

		const id = user.id
		pages[id] = pages[id] || 0

		const embed = embeds[pages[id]]
		let reply: Message | undefined
		let collector

		const filter = (i: Interaction) => i.user.id === user.id
		const time = 1000 * 60 * 5

		if (message) {
			reply = await message.reply({
				embeds: [embed],
				components: [getRow(id)],
			})
		} else {
			interaction.reply({
				ephemeral: true,
				embeds: [embed],
				components: [getRow(id)],
			})
		}

		// eslint-disable-next-line prefer-const
		collector = channel.createMessageComponentCollector({ filter, time })

		collector.on('collect', (btnInt) => {
			if (!btnInt) {
				return
			}

			btnInt.deferUpdate()

			if (
				btnInt.customId !== 'prev_embed' &&
                    btnInt.customId !== 'home_embed' &&
					btnInt.customId !== 'next_embed'
			) {
				return
			}

			if (
				btnInt.customId === 'prev_embed' && 
					pages[id] > 0
			) {
				--pages[id]
			} 
			else if (
				btnInt.customId === 'next_embed' && 
                    pages[id] < embeds.length - 1
			) {
				++pages[id]
			} else if (
				btnInt.customId === 'home_embed'
			) {
				pages[id] = 0
			}

			if (reply) {
				reply.edit({
					embeds: [embeds[pages[id]]],
					components: [getRow(id)],
				})
			} else {
				interaction.editReply({
					embeds: [embeds[pages[id]]],
					components: [getRow(id)],
				})
			}
		})
	},
} as ICommand