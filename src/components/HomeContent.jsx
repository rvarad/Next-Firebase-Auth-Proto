import Link from "next/link"
import React from "react"
import { signOut } from "../lib/firebase/auth"

function HomeContent({ user }) {
	return user ? (
		<>
			<p>Hi!</p>
			<p>You are signed in as {user.email}</p>
			{/* <Link href={"/api/v1/auth/signout"}> */}
			<button onClick={async () => await signOut()}>
				<div className="w-[120px] h-[60px] flex items-center justify-center border-2 border-white rounded-2xl">
					Sign out
				</div>
			</button>
			{/* </Link> */}
		</>
	) : (
		<>
			<Link href={"/signin"}>
				<div className="w-[120px] h-[60px] flex items-center justify-center border-2 border-white rounded-2xl">
					Sign in
				</div>
			</Link>
			<Link href={"/signup"}>
				<div className="w-[120px] h-[60px] flex items-center justify-center border-2 border-white rounded-2xl">
					Sign up
				</div>
			</Link>
		</>
	)
}

export default HomeContent
