/* eslint-disable indent */
import { error, info } from '../../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS, { Client, GuildMember, Role, TextChannel, MessageSelectMenu, MessageSelectOptionData, MessageActionRow, MessageAttachment, Emoji } from 'discord.js'
import { ActionRowBuilder, ModalActionRowComponentBuilder, SelectMenuBuilder } from '@discordjs/builders'

export default {
	category: 'Servers',
	description: 'Send the ":D" rules.',

	permissions: ['ADMINISTRATOR'],

	slash: true,

	testOnly: true,
	guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'rule_menu') {
                if (values[0] === 'roles') {
                    interaction.reply({
                        embeds: [info('Choose your own roles in: <#997955483816181840>', 'Roles', '', '', '')],
                        ephemeral: true,
                    })
                } else if (values[0] === 'textchannel') {
                    interaction.reply({
                        embeds: [info('Chat with other members in: <#990521519283273730>', 'Textchannel', '', '', '')],
                        ephemeral: true,
                    })
                }
            }
        })
    },

	callback: async ({ message, interaction, args, client, channel, guild }) => {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('rule_menu')
                        .setPlaceholder('Select an option...')
                        .setOptions(
                            {
                                label: 'Roles',
                                description: 'Choose your own roles.',
                                value: 'roles',
                                emoji: '🚀'
                            },
                            {
                                label: 'Textchannel',
                                description: 'Chat with other members.',
                                value: 'textchannel',
                                emoji: '⌨️'
                            },
                        )
                )
            
            const arrow = guild?.emojis.cache.find(emoji => emoji.name === 'arrow')

            const cont = (`${arrow} Be friendly and respectful!\n${arrow} Accept the opinion of other users!\n${arrow} Bullying and discrimination will not be tolerated!\n${arrow} Choose your username and profile picture carefully!\n${arrow} Exploitation of bugs is not allowed!\n${arrow} Harassment and spam of any kind is not welcome!\n${arrow} Don't be an ass!\n${arrow} Follow the general Discord guidelines!`)

            interaction.channel?.send({ embeds: [info(cont, '__Follow the rules and feel like at home!__', '', '', '')], components: [row] })
            interaction.reply({ content: 'succes', ephemeral: true })
	}
} as ICommand