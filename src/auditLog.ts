/* eslint-disable no-undef */
// ////////////////////////////////////////////////////////////////////
// Audit Log
// ////////////////////////////////////////////////////////////////////

client.on('messageDelete', async message => {
	const chan = client.channels.cache.get('992066447134167090')
	await chan.send({ embeds: [Embeds.log('Message deleted', `A message by ${message.author.tag} was deleted, but we don't know by who yet.`)] })
})
client.on('guildMemberRemove', async member => {
	const chan = client.channels.cache.get('992066447134167090')
	await chan.send({ embeds: [Embeds.log('Member left', `${member.user.tag} left the guild... but was it of their own free will?`)] })
})
client.on('guildBanAdd', async ban => {
	const chan = client.channels.cache.get('992066447134167090')
	await chan.send({ embeds: [Embeds.log('Banned member', `${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}.`)] })
})