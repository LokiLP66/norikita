/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
import * as Embeds from './../messages/embeds'
import { player } from './../main'
const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice')


class WebPanel {
	token: any
	port: any
	client: any
	app: any
	server: any
	constructor(token: any, port: any, client: any) {
		this.token = token
		this.port = port
		this.client = client

		this.app = express()
		this.app.engine('hbs', hbs.engine({
			extname: 'hbs',
			defaultLayout: 'layout',
			layoutsDir: path.join(__dirname, '/layouts')
		}))
		this.app.set('views', path.join(__dirname, 'views'))
		this.app.set('view engine', 'hbs')
		this.app.use(express.static(path.join(__dirname, 'public')))
		this.app.use(bodyParser.urlencoded({ extended: false }))
		this.app.use(bodyParser.json())

		this.registerRoots()

		this.server = this.app.listen(port, () => {
			console.log(`WebSocket server started on port ${port}`)
		})
	}

	checkToken(_token: any) {
		return (_token == this.token)
	}

	registerRoots() {
		this.app.get('/', (req: any, res: any) => {
			const _token = req.query.token
			
			if (!this.checkToken(_token)) {
				res.render('error', { title: 'ERROR' })
				return
			}
			
			const guild = this.client.guilds.cache.get('990521467215171594')
			const chans: { id: any; name: any }[] = []
			guild.channels.cache
				.filter((c: { type: string }) => c.type == 'text')
				.forEach((c: { id: any; name: any }) => {
					chans.push({id: c.id, name: c.name})
				})

			res.render('index', { 
				title: 'Webpanel', 
				botName: this.client.user?.tag, 
				botGuildsLength: this.client.guilds.cache.size,
				guildsMembersLength: this.client.guilds.cache.reduce((a: any, b: any) => a + b.memberCount, 0),
				chans
			})
		})

		// create a array with all files in ../sounds and remove .mp3
		const sounds: { name: any }[] = []
		const files = fs.readdirSync(path.join(__dirname, '../sounds'))
		files.forEach((file: any) => {
			if (file.endsWith('.mp3')) {
				sounds.push({ name: file.replace('.mp3', '') })
			}
		})

		this.app.get('/soundboard', (req: any, res: any) => {
			const _token = req.query.token
			
			if (!this.checkToken(_token)) {
				res.render('error', { title: 'ERROR' })
				return
			}

			player.on('error', (error: { message: any; resource: { metadata: { title: any } } }) => {
				console.error('Error:', error.message, 'with track', error.resource.metadata.title)
			})

			res.render('soundboard', { 
				title: 'Soundboard', 
				sounds: sounds
			})
		})

		// sounds
		this.app.post('/ac', (req: any, res: any) => {
			const guild = this.client.guilds.cache.get('990521467215171594')
			const connection = joinVoiceChannel({
				channelId: '992080572358864987',
				guildId: guild?.id,
				adapterCreator: guild?.voiceAdapterCreator,
			})
			const resource = createAudioResource(path.join(__dirname, '../sounds/ac.mp3'))
			connection.subscribe(player)
			player.play(resource)
		})

		this.app.post('/allahuakbar', (req: any, res: any) => {
			const guild = this.client.guilds.cache.get('990521467215171594')
			const connection = joinVoiceChannel({
				channelId: '992080572358864987',
				guildId: guild?.id,
				adapterCreator: guild?.voiceAdapterCreator,
			})
			const resource = createAudioResource(path.join(__dirname, '../sounds/allahuakbar.mp3'))
			connection.subscribe(player)
			player.play(resource)
		})

		this.app.post('/lol', (req: any, res: any) => {
			const guild = this.client.guilds.cache.get('990521467215171594')
			const connection = joinVoiceChannel({
				channelId: '992080572358864987',
				guildId: guild?.id,
				adapterCreator: guild?.voiceAdapterCreator,
			})
			const resource = createAudioResource(path.join(__dirname, '../sounds/lol.mp3'))
			connection.subscribe(player)
			player.play(resource)
		})
		

		// commands
		this.app.post('/say', (req: any, res: any) => {
			const _token = req.body.token
			const channelid = req.body.channelId
			const guild = this.client.guilds.cache.get('990521467215171594')
			const text = req.body.text

			if(!_token || !channelid || !text)
				return res.sendStatus(400)
    
			if (!this.checkToken(_token))
				return res.sendStatus(401)

			const chan = guild?.channels.cache.get(channelid)

			if (chan) {
				chan.send({ embeds: [Embeds.info(text, 'Say', '', '', '')] })
				res.sendStatus(200)
			} else {
				res.sendStatus(406)
			}
		})
		this.app.post('/ping', (req: any, res: any) => {
			const _token = req.body.token
			const channelid = req.body.channelId
			const guild = this.client.guilds.cache.get('990521467215171594')

			if(!_token || !channelid)
				return res.sendStatus(400)
    
			if (!this.checkToken(_token))
				return res.sendStatus(401)

			const chan = guild?.channels.cache.get(channelid)

			if (chan) {
				chan.send({ embeds: [Embeds.info(`${this.client.ws.ping}ms`, 'Ping', '', '', '')] })
				res.sendStatus(200)
			} else {
				res.sendStatus(406)
			}
		})
	}
}

export = WebPanel

function channelid(channelid: any) {
	throw new Error('Function not implemented.')
}
