import { firebaseAdminAuth } from "./adminAppConfig"
import { getSession } from "./session"

async function isUserAuthenticated(sessionCookie) {
	const session = sessionCookie ?? (await getSession())

	if (!session) return false

	try {
		const isRevoked = await firebaseAdminAuth.verifySessionCookie(session, true)
		return !!isRevoked
	} catch (error) {
		console.error("Error verifying session cookie", error)
		return false
	}
}

async function getCurrentUser() {
	const session = await getSession()

	if (!session) return

	if (!(await isUserAuthenticated(session))) return null

	const decodedToken = await firebaseAdminAuth.verifySessionCookie(session)
	const currentUserUid = await firebaseAdminAuth.getUser(decodedToken.uid)

	const currentUser = firebaseAdminAuth.getUser(currentUserUid.uid)

	return currentUser
}

export { isUserAuthenticated, getCurrentUser }
