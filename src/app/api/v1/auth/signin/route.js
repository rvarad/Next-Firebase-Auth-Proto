// import { auth } from "firebase-admin"
import { cookies } from "next/headers"
// import { firebaseAdminAuth } from "../../../../../lib/firebase/firebase-admin/adminAppConfig"
import { createSessionCookie } from "../../../../../lib/firebase/firebase-admin/session"
// import { headers } from "next/headers"

async function POST(request) {
	const authHeader = request.headers.get("Authorization")
	if (authHeader?.startsWith("Bearer ")) {
		const idToken = authHeader.slice(7)
		// const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken)

		const expiry = 5 * 24 * 60 * 60 * 1000

		const sessionCookie = await createSessionCookie(idToken, {
			expiresIn: expiry,
		})

		const options = {
			name: "session",
			value: sessionCookie,
			maxAge: expiry,
			httpOnly: true,
			secure: true,
			path: "/",
		}

		const cookieStore = await cookies()
		cookieStore.set(options)

		console.log("cookies: ", (await cookies()).get("session"))

		return new Response(
			JSON.stringify({
				message: "Signed in successfully",
			}),
			{ status: 200 }
		)
	} else {
		return new Response(
			JSON.stringify({
				message: "Unauthorized",
			}),
			{ status: 401 }
		)
	}
}

export { POST }
