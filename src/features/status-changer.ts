import { ActivityType, Client } from 'discord.js'

export default (client: Client) => {
	const statusOptions = [
		'/help',
		'by Kamachi#6622',
	]
	let counter = 0

	const updateStatus = () => {
		client.user?.setPresence({
			status: 'dnd',
			activities: [
				{
					name: statusOptions[counter],
					type: 'WATCHING',
				}
			]
		})

		if (++counter >= statusOptions.length) {
			counter = 0
		}

		setTimeout(updateStatus, 1000 * 60 * 0.5)
	}
	updateStatus()
}

export const config = {
	displayName: 'Status Changer',
	dbName: 'STATUS_CHANGER',
}