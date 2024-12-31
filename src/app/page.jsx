import Link from "next/link"
import HomeContent from "../components/HomeContent"
import { getCurrentUser } from "../lib/firebase/firebase-admin/user"
import { signOut } from "../lib/firebase/auth"
import { cookies } from "next/headers"
import { getSession } from "../lib/firebase/firebase-admin/session"

export default async function Page() {
	const currentUser = await getCurrentUser()

	// console.log("cookies: ", (await cookies()).get("session"))

	// console.log("session: ", await getSession())

	return (
		<div className="h-screen w-screen flex flex-row items-center justify-evenly">
			{/* <HomeContent /> */}
			{currentUser ? (
				<>
					<p>Hi!</p>
					<p>You are signed in as {currentUser.email}</p>
					{/* <Link href={"/api/v1/auth/signout"}> */}
					<form
						onSubmit={async () => {
							"use server"
							const cookieStore = await cookies()
							// console.log("cookieStore: ", cookieStore)

							await signOut(cookieStore.get("session"))
						}}
					>
						<button>
							<div className="w-[120px] h-[60px] flex items-center justify-center border-2 border-white rounded-2xl">
								Sign out
							</div>
						</button>
					</form>
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
			)}
		</div>
	)
}
