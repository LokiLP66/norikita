/* eslint-disable @typescript-eslint/no-var-requires */
import { Client } from 'discord.js'
import fs from 'fs'
import getFiles from './get-files'

export default (client: Client) => {
	const commands = {} as {
        [key: string]: any
    }

	const suffix = '.ts'

	const commandFiles = getFiles('./context_commands', suffix)
	console.log(commandFiles)

	for (const command of commandFiles) {
		let commandFile = require(command)
		if (commandFile.default) commandFile = commandFile.default

		const split = command.replace(/\\/g, '/').split('/')
		const commandName = split[split.length - 1].replace(suffix, '')
		commands[commandName.toLowerCase()] = commandFile
	}

	console.log(commands)
}
