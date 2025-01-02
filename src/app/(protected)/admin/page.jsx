import React from "react"
import { getSession } from "../../../lib/firebase/firebase-admin/session"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../../../lib/firebase/firebase-admin/user"

async function Page() {
	const currentUser = await getCurrentUser()

	if (currentUser?.customClaims?.admin !== true) {
		return (
			<div>
				<h1>Admin access needed</h1>
			</div>
		)
	}

	return <div>Admin page</div>
}

export default Page
