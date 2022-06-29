const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { secrets } = require('./data/config.json');
const Embeds = require('./messages/embeds');

const client = new Client({ 
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// ////////////////////////////////////////////////////////////////////
// ReactionRole
// ////////////////////////////////////////////////////////////////////

client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	if (reaction.message.id == '990544112853843968') {
		if (reaction.emoji.name == 'white_check_mark') {
			const role = roles.id('990521995332558898')
			const member = reaction.emoji.author
			member.roles.add(role);
		} else {
			console.error('reaction role error!')
			return
		}
	}
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
	} else {
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
// CLIENT
// ////////////////////////////////////////////////////////////////////
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			embeds: [Embeds.error('Error', 'There was an error while executing this command!')]
		})
	}
});

client.login(secrets.token);

