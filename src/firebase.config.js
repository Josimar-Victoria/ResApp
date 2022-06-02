import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCyUzgHgF_OUB7kpNdX-MA5IYXfFcyQ_ZU',
  authDomain: 'restaurapp-e6e53.firebaseapp.com',
  databaseURL: 'https://restaurapp-e6e53-default-rtdb.firebaseio.com',
  projectId: 'restaurapp-e6e53',
  storageBucket: 'restaurapp-e6e53.appspot.com',
  messagingSenderId: '244729027697',
  appId: '1:244729027697:web:641226fa43aa6003718fd0'
}

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, storage, firestore }

