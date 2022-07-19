import mongoose, { Schema } from 'mongoose'

const reqString = {
	type: String,
	required: true,
}

const welcomeSchema = new Schema({
	_id: reqString,
	channelId: reqString,
	text: reqString,
	roleId: reqString,
})

const name = 'welcome-schema'
export default mongoose.models[name] || mongoose.model(name, welcomeSchema, name)