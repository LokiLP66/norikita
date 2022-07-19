/* eslint-disable indent */
import { Client, Role } from 'discord.js'
import rainbowSchema from '../models/rainbow-schema'

const rainbowData = {} as {
    [key: string]: [Role]
}

export default (client: Client) => {
	client.on('roleUpdate', async role => {
        const guild = role.guild
        let data = rainbowData[guild.id]

        if (!data) {
			const results = await rainbowSchema.findById(guild.id)
			if (!results) {
				return
			}

			const { roleId } = results
			data = rainbowData[guild.id] = [roleId]
		}

        type ColorsResolvable = [
            '#D32F2F',
            '#F44336',
            '#E64A19',
            '#FF5722',
            '#F9A825',
            '#FFEB3B',
            '#558B2F',
            '#2E7D32',
            '#283593',
            '#3F51B5',
            '#6A1B9A',
            '#673AB7'
        ]

        const colours: ColorsResolvable = [
            '#D32F2F',
            '#F44336',
            '#E64A19',
            '#FF5722',
            '#F9A825',
            '#FFEB3B',
            '#558B2F',
            '#2E7D32',
            '#283593',
            '#3F51B5',
            '#6A1B9A',
            '#673AB7'
        ]

        setInterval(() => {
            const r_colours = colours[Math.floor(Math.random() * colours.length)]
            guild?.roles.edit(data[0], { color: r_colours})
            .then()
            .catch(console.error)
        }, 1000 * 60 * 0.5)
	})
}

export const config = {
	displayName: 'Rainbow Role',
	dbName: 'RAINBOW_ROLE',
}