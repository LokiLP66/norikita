import * as nodeFs from 'node:fs'
import nodePath from 'node:path'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { IDs, secrets } from './data/config.json'


const commands = []
const commandsPath = nodePath.join(__dirname, './commands')
const commandFiles = nodeFs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
	const filePath = nodePath.join(commandsPath, file)
	const command = require(filePath)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(secrets.token)

rest.put(Routes.applicationGuildCommands(IDs.clientId, IDs.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)