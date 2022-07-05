/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
export * as ping from './ping'
export * as ticket from './ticket'
import fs from 'fs'
import path from 'path'
import { info } from '../messages/embeds'

const commandsPath = path.join(__dirname, '../commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

function loopArray(commandFiles: string[]) {
	const i = 1
}


// help outputs 