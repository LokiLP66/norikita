/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const { ids } = require('./../data/config.json')

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

			/*
			const chans: { id: any; name: any }[] = []
			this.client.channels.cache
				.filter((c: { type: string }) => c.type == 'text')
				.forEach((c: { id: any; name: any }) => {
					chans.push({id: c.id, name: c.name})
				})
			*/

			res.render('index', { 
				title: 'Webpanel', 
				botName: this.client.tag, 
				botGuildsLength: this.client.guilds.cache.size,
				guildsMembersLength: this.client.guilds.cache.reduce((a: any, b: any) => a + b.memberCount, 0)
			})
		})
	}
}

export = WebPanel