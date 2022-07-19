import mongoose, { Schema } from 'mongoose'

const reqString = {
	type: String,
	required: true,
}

const rainbowSchema = new Schema({
	_id: reqString,
	roleId: reqString,
})

const name = 'rainbow-schema'
export default mongoose.models[name] || mongoose.model(name, rainbowSchema, name)