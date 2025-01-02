import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as _signOut,
} from "firebase/auth"
import { firebaseClientAuth } from "./clientAppConfig"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { isRedirectError } from "next/dist/client/components/redirect-error"

async function signUp(email, password) {
	try {
		await createUserWithEmailAndPassword(firebaseClientAuth, email, password)

		await _signOut(firebaseClientAuth)
	} catch (error) {
		console.log("Error signing up with email and password", error)
	}
}

async function signIn(email, password) {
	try {
		const userCredentials = await signInWithEmailAndPassword(
			firebaseClientAuth,
			email,
			password
		)
		const idToken = await userCredentials.user.getIdToken()

		const response = await fetch("/api/v1/auth/signin", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		})

		if (response.status === 200) {
			return true
			// return await response.json()
		} else {
			return false
			// return response.json().then((data) => JSON.parse(data))
		}
	} catch (error) {
		console.error("Error signing in with email and password", error)
		return false
	}
}

async function signOut(session) {
	try {
		await _signOut(firebaseClientAuth)

		// console.log("session: ", session)

		const response = await fetch("http://localhost:3000/api/v1/auth/signout", {
			method: "POST",
			headers: {
				Cookie: `session=${session.value}`,
				// "Content-Type": "application/json",
			},
		})

		if (response.status === 200) {
			console.log("Signed out")
			// redirect("/signin")
		} else {
			return false
		}
	} catch (error) {
		console.error("Error signing out", error)

		if (isRedirectError(error)) throw error
	}
}

export { signUp, signIn, signOut }
