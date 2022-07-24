/* eslint-disable indent */
import { Client, Role } from 'discord.js'
import rainbowSchema from '../models/rainbow-schema'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colours = require('../data/config.json')

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

        const colourOptions = [
            colours.red.aaa,
        ]

        let counter = 0

        const updateRole = () => {

            guild?.roles.edit(data[0], { color: colourOptions[counter]})
                .then()
                .catch(console.error)

            if (++counter >= colourOptions.length) {
                counter = 0
            }

            setTimeout(updateRole, 1000 * 60 * 0.5)
        }
        updateRole()
    })
}

export const config = {
	displayName: 'Rainbow Role',
	dbName: 'RAINBOW_ROLE',
}