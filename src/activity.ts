/* eslint-disable no-undef */
// ////////////////////////////////////////////////////////////////////
// Activity
// ////////////////////////////////////////////////////////////////////
client.on('ready', async () => {
	const servers = await client.guilds.cache.size
	const servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

	const activities = [
		`On ${servers} servers`,
		`helps ${servercount} users`,
		'by LokiLP66#6622',
		'version 2.0.0',
	]

	setInterval(() => {
		const status = activities[Math.floor(Math.random() * activities.length)]
		client.user.setPresence({ activities: [{ name: `${status}` }] })
	}, 5000)
})