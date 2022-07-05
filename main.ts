import { client } from './bot'
import { createRestApi } from './rest-api'

const PORT = process .env. PORT || 8000
const api = createRestApi(client)
api.listen ( PORT, () => {
	console.log(`[rest-api]: Bot rest-api is running at http://localhost:${PORT}`)
})