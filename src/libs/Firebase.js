import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export let app = undefined
export let analytics = undefined
export let fbStore = undefined

export default function initializeFirebase(config) {
    app = initializeApp(config)
    analytics = getAnalytics(app)
    fbStore = getFirestore(app)
}