import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

export let app = undefined
export let analytics = undefined
export let fbStore = undefined
export let fbStorage = undefined

export default function initializeFirebase(config) {
    app = initializeApp(config)
    analytics = getAnalytics(app)
    fbStore = getFirestore(app)
    fbStorage = getStorage(app)
}