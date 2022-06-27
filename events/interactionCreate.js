const fs = require('fs-extra')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		i = 1
		var dataID = i
		const d = new Date()
		const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

		// time
		let year = d.getFullYear()
		let month = months[d.getMonth()]
		let day = d.getUTCDate();
		let hour = d.getHours() 
		let minute = d.getMinutes() 
		let second = d.getSeconds() 
		let milisecond = d.getMilliseconds()

		const date = `${month} ${day}, ${year} ${hour}:${minute}:${second}:${milisecond}`

		// Storing the JSON format data in myObject
		var data = fs.readFileSync("data/logs/log.json");
		var myObject = [JSON.parse(data)]
		
		// Defining new data to be added
		let newData = {
			User:interaction.user.tag, 
			Channel:"#" + interaction.channel.name, 
			Date:date,
			ID:dataID
		};
		
		// Adding the new data to our object
		myObject.push(newData);
		
		// Writing to our JSON file
		var newData2 = JSON.stringify(myObject, null, "\t");
		fs.writeFile("data/logs/log.json", newData2, (err) => {
			// Error checking
			if (err) throw err;
			console.log("New data added");
		});  
}};