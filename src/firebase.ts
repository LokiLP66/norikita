import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {

	apiKey: 'AIzaSyAQ1WzyEUk348aQJw0W6JO_JS1LZL-_h94',

	authDomain: 'norikita-lokilp66.firebaseapp.com',

	projectId: 'norikita-lokilp66',

	storageBucket: 'norikita-lokilp66.appspot.com',

	messagingSenderId: '767147535901',

	appId: '1:767147535901:web:a5bf1d83c9ecd4f769e0f4'

}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function createTicket(threadId: string, text: string) {
	try {
		await addDoc(collection(db, 'tickets'), {
			threadId,
			text,
			openedAt: Date()
		})
	} catch(e) {
		console.error('Error adding document: ', e)
	}
}