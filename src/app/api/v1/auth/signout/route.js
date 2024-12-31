import { cookies } from "next/headers"
import { revokeSession } from "../../../../../lib/firebase/firebase-admin/session"

async function POST() {
	const cookieStore = await cookies()
	const session = cookieStore.get("session")

	console.log("session", (await cookies()).get("session"))

	if (!session) {
		return new Response(
			JSON.stringify({
				message: "Session cookie not found",
			}),
			{ status: 401 }
		)
	}

	try {
		await revokeSession(session)

		cookieStore.delete("session")

		return new Response(
			JSON.stringify({
				message: "Signed out successfully",
			}),
			{ status: 200 }
		)
	} catch (error) {
		console.log("Error signing out", error)

		return new Response(
			JSON.stringify({
				message: "Error signing out",
			}),
			{ status: 500 }
		)
	}
}

export { POST }
