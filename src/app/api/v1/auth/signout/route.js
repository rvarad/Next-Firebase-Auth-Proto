import { cookies } from "next/headers"
import {
	getSession,
	revokeSession,
} from "../../../../../lib/firebase/firebase-admin/session"

async function POST(request) {
	// const session = await getSession()

	const cookieStore = await cookies()

	const session = cookieStore.get("session")

	// console.log("session", session)

	// const sessionHeader = request.headers.get("Cookie")
	// if (sessionHeader.startsWith("Session ")) {
	// 	const sessionCookie = sessionHeader.slice(8)

	// 	console.log(sessionCookie.value)

	// 		const cookieStore = await cookies()

	try {
		await revokeSession(session.value)
		// cookieStore.set({ name: "session", value: "", maxAge: -1 })

		// cookieStore.delete("session")

		// console.log("session", session)

		return new Response(
			JSON.stringify({
				message: "Signed out successfully",
			}),
			{ status: 200 }
		)
		// return Response.redirect(new URL("/", request.url), 308)
	} catch (error) {
		console.log("Error signing out", error)

		return new Response(
			JSON.stringify({
				message: "Error signing out",
			}),
			{ status: 500 }
		)
	}

	// const cookieStore = await cookies()
	// const session = cookieStore.get("session")

	// // console.log("session", (await cookies()).get("session"))

	// if (!session) {
	// 	return new Response(
	// 		JSON.stringify({
	// 			message: "Session cookie not found",
	// 		}),
	// 		{ status: 401 }
	// 	)
	// }
}

export { POST }
