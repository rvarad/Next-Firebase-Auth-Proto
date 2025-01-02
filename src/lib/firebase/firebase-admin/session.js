import { cookies } from "next/headers"
import { firebaseAdminAuth } from "./adminAppConfig"

async function createSessionCookie(idToken, sessionCookieOptions) {
	try {
		const verifiedToken = await firebaseAdminAuth.verifyIdToken(idToken)
		if (verifiedToken) {
			return firebaseAdminAuth.createSessionCookie(
				idToken,
				sessionCookieOptions
			)
		}
	} catch (error) {
		console.error("Error creating session cookie", error)
		return error
	}
}

async function getSession() {
	try {
		const cookieStore = await cookies()
		const sessionCookie = cookieStore.get("session")

		const verifiedSession = await firebaseAdminAuth.verifySessionCookie(
			sessionCookie.value
		)

		return verifiedSession
	} catch (error) {
		console.error("Error getting session cookie", error)
		return error
	}
}

async function revokeSession(sessionCookie) {
	try {
		const verifiedSession = await firebaseAdminAuth.verifySessionCookie(
			sessionCookie
		)

		if (!verifiedSession) return

		return firebaseAdminAuth.revokeRefreshTokens(verifiedSession.sub)
	} catch (error) {
		console.error("Error revoking session cookie", error)
		return error
	}
}

export { createSessionCookie, getSession, revokeSession }
