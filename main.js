const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { secrets } = require('./data/config.json');
const Embeds = require('./messages/embeds');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});


// ////////////////////////////////////////////////////////////////////
// Audit Log
// ////////////////////////////////////////////////////////////////////

client.on('messageDelete', async message => {
	const chan = client.channels.cache.get('992066447134167090');
	await chan.send({ embeds: [Embeds.log('Message deleted', `A message by ${message.author.tag} was deleted, but we don't know by who yet.`)] });
});
client.on('guildMemberRemove', async member => {
	const chan = client.channels.cache.get('992066447134167090');
	await chan.send({ embeds: [Embeds.log('Member left', `${member.user.tag} left the guild... but was it of their own free will?`)] });
});
client.on('guildBanAdd', async ban => {
	const chan = client.channels.cache.get('992066447134167090');
	await chan.send({ embeds: [Embeds.log('Banned member', `${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}.`)] });
});

// ////////////////////////////////////////////////////////////////////
// EVENTS
// ////////////////////////////////////////////////////////////////////

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// ////////////////////////////////////////////////////////////////////
// COMMANDS
// ////////////////////////////////////////////////////////////////////

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.name, command);
}

// ////////////////////////////////////////////////////////////////////
// Interaction Error
// ////////////////////////////////////////////////////////////////////
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({
			embeds: [Embeds.error('Error', 'There was an error while executing this command!')],
			ephemeral: true,
		});
	}
});

// ////////////////////////////////////////////////////////////////////
// Activity
// ////////////////////////////////////////////////////////////////////
client.on('ready', async () => {
	const servers = await client.guilds.cache.size;
	const servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

	const activities = [
		`On ${servers} servers`,
		`helps ${servercount} users`,
		'by LokiLP66#6622',
		'version 2.0.0',
	];

	setInterval(() => {
		const status = activities[Math.floor(Math.random() * activities.length)];
		client.user.setPresence({ activities: [{ name: `${status}` }] });
	}, 5000);
});

client.login(secrets.token);

