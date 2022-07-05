/* eslint-disable @typescript-eslint/no-var-requires */
export * as ping from './ping'
export * as ticket from './ticket'
import { name, description } from './help'
import fs from 'fs'
import path from 'path'

const commandsPath = path.join(__dirname, '../commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))

for (let i = 1; i < commandFiles.length; i++) {
    const text = commandFiles[i].indexOf('.ts')
    const len = commandFiles[i].length
    const cmd = len - text
    console.log(cmd)
  }