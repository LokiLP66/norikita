import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { IDs, secrets } from './data/config.json'
import * as commandModules from './commands/commandIndex'

type Command = {
	data: unknown
}

const commands = []

for (const module of Object.values<Command>(commandModules)) {
	commands.push(module.data)
}

const rest = new REST({ version: '10' }).setToken(secrets.token)

rest.put(Routes.applicationGuildCommands(IDs.clientId, IDs.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)