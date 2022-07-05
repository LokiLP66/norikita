export * as ping from './ping'
export * as ticket from './ticket'
import { name, description } from './help'
import fs from 'fs'
import path from 'path'

let file = ''
console.log(fs.readdir(__dirname, '../commands/${file}'))

const Commands = {
	name: name,
	description: description
}

console.log(Commands)
