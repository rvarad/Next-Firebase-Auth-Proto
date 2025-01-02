import { cookies } from "next/headers"
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
	// const session = await getSession()

	const cookieStore = await cookies()
	const session = cookieStore.get("session")

	if (!session) return

	if (!(await isUserAuthenticated(session.value))) return null

	const decodedToken = await firebaseAdminAuth.verifySessionCookie(
		session.value
	)

	const currentUserUid = await firebaseAdminAuth.getUser(decodedToken.uid)

	const currentUser = firebaseAdminAuth.getUser(currentUserUid.uid)

	return currentUser
}

async function setAdminAccess() {
	const currentUser = await getCurrentUser()

	if (!currentUser) return

	// if (currentUser.customClaims.admin === true) return

	await firebaseAdminAuth.setCustomUserClaims(currentUser.uid, { admin: true })
}

export { isUserAuthenticated, getCurrentUser, setAdminAccess }
