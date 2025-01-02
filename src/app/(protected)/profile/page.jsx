import React from "react"
import {
	getCurrentUser,
	setAdminAccess,
} from "../../../lib/firebase/firebase-admin/user"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { signOut } from "../../../lib/firebase/auth"
import { revalidatePath } from "next/cache"
import ProfilePageContent from "./ProfilePageContent"

async function Page() {
	const currentUser = await getCurrentUser()

	async function handleSignOut() {
		"use server"
		const cookieStore = await cookies()

		await signOut(cookieStore.get("session"))

		cookieStore.delete("session")

		// redirect("/")
	}

	return (
		<div>
			<h1>Profile</h1>
			<ProfilePageContent
				currentUserEmail={currentUser.email}
				handleSignOut={handleSignOut}
			/>
		</div>
	)
}

export default Page
