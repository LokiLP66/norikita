/* eslint-disable indent */
import { error, info } from '../../messages/embeds'
import { ICommand } from 'wokcommands'
import DJS, { Client, GuildMember, Role, TextChannel, MessageSelectMenu, MessageSelectOptionData, MessageActionRow } from 'discord.js'

export default {
	category: 'Servers',
	description: 'Adds a role to a mesage.',

	permissions: ['ADMINISTRATOR'],

	minArgs: 3,
	maxArgs: 4,
	expectedArgs: '<channel> <messageid> <role> <emoji>',

    options: [
        {
			name: 'channel',
			description: 'Please enter a channel!',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
		},
        {
			name: 'messageid',
			description: 'Please enter a messageId!',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING
		},
        {
			name: 'role',
			description: 'Please enter a role!',
			required: true,
			type: DJS.Constants.ApplicationCommandOptionTypes.ROLE
		},
        {
			name: 'emoji',
			description: 'Please enter a emoji!',
			required: false,
			type: DJS.Constants.ApplicationCommandOptionTypes.STRING
		},
    ],

	slash: true,

	testOnly: false,
	guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option: { value: string }) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    embeds: [info('Updated roles', 'Roles', '', '', '')],
                    ephemeral: true,
                })
            }
        })
    },

	callback: async ({ message, interaction, args, client, channel, guild }) => {
		const chan = interaction.options.getChannel('channel')
		if (!chan || chan.type !== 'GUILD_TEXT') {
			channel.send({ embeds: [error('Please tag a text channel.', 'Error', '', '', '')] })
		}

        const messageId = args[1]

		const role = interaction.options.getRole('role') as Role

		if (role !== guild?.roles.cache.get(role.id)) {
			channel.send({ embeds: [error('Unknown role.', 'Error', '', '', '')] })
		}

        const targetMessage = await (chan as unknown as TextChannel).messages.fetch(messageId, {
            cache: true,
            force: true,
        })
        if (!targetMessage) {
			channel.send({ embeds: [error('Unknown message ID.', 'Error', '', '', '')] })
		}
        if (targetMessage.author.id !== client.user?.id) {
			channel.send({ embeds: [error(`Please provide a message ID that was sent from <@${client.user?.id}>.`, 'Error', '', '', '')] })
		}

        let row = targetMessage.components[0] as MessageActionRow
        
        if (!row) {
            row = new MessageActionRow
			channel.send({ embeds: [error('Unknown role.', 'Error', '', '', '')] })
		}

        const emoji = interaction.options.getString('emoji') as string

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id,
            emoji: emoji
        }]

        // eslint-disable-next-line prefer-const
        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu.`,
                        allowedMentions: {
                            roles: [],
                        },
                        ephemeral: true,
                    }
                }
            }
            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Select your roles...')
                    .setOptions(option)
            )
        }
        targetMessage.edit({
            components: [row]
        })
        return {
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu.`,
            allowedMentions: {
                roles: [],
            },
            ephemeral: true,
        }
	}
} as ICommand