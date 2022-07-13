import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import * as commandModules from './commands/commandIndex'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ids, secrets } = require('./data/config.json')

type Command = {
	data: unknown
}

const commands = []

for (const module of Object.values<Command>(commandModules)) {
	commands.push(module.data)
}

const rest = new REST({ version: '10' }).setToken(secrets.token)

rest.put(Routes.applicationCommands(ids.client), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)