module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const activities = 'https://discord.gg/RUEKstzwES/'
		const { ReactionRole } = require("discordjs-reaction-role");

		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(activities);
		client.user.setStatus('invisible');
	},
};