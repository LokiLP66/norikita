import { Client, Role, TextChannel } from 'discord.js'
import { info } from '../messages/embeds'
import welcomeSchema from '../models/welcome-schema'

const welcomeData = {} as {
    [key: string]: [TextChannel, string, Role]
}

export default (client: Client) => {
	client.on('guildMemberAdd', async member => {
		const { guild, id } = member
		let data = welcomeData[guild.id]

		if (!data) {
			const results = await welcomeSchema.findById(guild.id)
			if (!results) {
				return
			}

			const { channelId, text, roleId } = results
			const channel = guild.channels.cache.get(channelId) as TextChannel
			data = welcomeData[guild.id] = [channel, text, roleId]
		}

		data[0].send({
			embeds: [info(`${data[1].replace(/@/g, `<@${id}>`)}`, 'Welcome', '', '', '')],
			allowedMentions: {
				users: [],
			}
		})
		member.roles.add(data[2])
	})
}

export const config = {
	displayName: 'Welcome Channel',
	dbName: 'WELCOME_CHANNEL'
}