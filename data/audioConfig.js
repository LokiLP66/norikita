module.exports = {
	opt: {
		DJ: {
			enabled: false,
			roleName: 'Ichiro',
			commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume'],
		},
		maxVol: 100,
		loopMessage: false,
		discordPlayer: {
			ytdlOptions: {
				quality: 'highestaudio',
				highWaterMark: 1 << 25,
			},
		},
	},
};