"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

function ProfilePageContent({ currentUserEmail, handleSignOut }) {
	const router = useRouter()
	function signOut() {
		handleSignOut()
		router.push("/")
	}
	return (
		<>
			<p>Hi!</p>
			<p>You are signed in as {currentUserEmail}</p>
			<Link href={"/set-admin-access"}>Get admin access</Link>
			<button onClick={signOut}>
				<div className="w-[120px] h-[60px] flex items-center justify-center border-2 border-white rounded-2xl">
					Sign out
				</div>
			</button>
		</>
	)
}

export default ProfilePageContent
