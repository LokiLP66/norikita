import * as fs from 'node:fs'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { IDs, secrets } from './data/config.json'


const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const command = require(`./commands/${file}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(secrets.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.')

		await rest.put(
			Routes.applicationGuildCommands(IDs.clientId, IDs.guildId),
			{ body: commands },
		)

		console.log('Successfully reloaded application (/) commands.')
	} catch (error) {
		console.error(error)
	}
})()