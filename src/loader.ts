/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { Collection } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import client = require('../main')

// ////////////////////////////////////////////////////////////////////
// EVENTS
// ////////////////////////////////////////////////////////////////////
console.log('Loading events...')

const eventsPath = path.join(__dirname, '../events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
	}
	else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}

// ////////////////////////////////////////////////////////////////////
// COMMANDS
// ////////////////////////////////////////////////////////////////////

console.log('Loading commands...')

client.commands = new Collection()
const commandsPath = path.join(__dirname, '../commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	client.commands.set(command.name, command)
}