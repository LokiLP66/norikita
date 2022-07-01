/* eslint-disable no-undef */
const Embeds = require('../messages/embeds');
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