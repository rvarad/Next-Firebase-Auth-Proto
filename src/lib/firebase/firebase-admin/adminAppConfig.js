import admin, { credential } from "firebase-admin"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

// if (!admin.apps.length) {
// 	const serviceAccount = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT
// 		? JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT)
// 		: null

// 	if (serviceAccount) {
// 		admin.initializeApp({
// 		})
// 	} else {
// 		throw new Error("FIREBASE_ADMIN_SERVICE_ACCOUNT is not defined")
// 	}
// }

export const firebaseAdminApp =
	getApps().length === 0
		? initializeApp(
				{
					credential: cert(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT),
				},
				"firebase-admin-trial"
		  )
		: getApps()[0]

export const firebaseAdminAuth = getAuth(firebaseAdminApp)

// export const firebaseAdminAuth = admin.auth()
// export const firebaseAdminDB = admin.firestore()
// export const firebaseAdmin = admin
