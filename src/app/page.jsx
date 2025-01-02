import Link from "next/link"
// import HomeContent from "../components/HomeContent"
// import { getCurrentUser } from "../lib/firebase/firebase-admin/user"
// import { signOut } from "../lib/firebase/auth"
// import { cookies } from "next/headers"
// import { getSession } from "../lib/firebase/firebase-admin/session"

export default async function Page() {
	// const currentUser = await getCurrentUser()

	// console.log("cookies: ", (await cookies()).get("session"))

	// console.log("session: ", await getSession())

	return (
		<div className="h-screen w-screen flex flex-row items-center justify-evenly">
			{/* <HomeContent /> */}
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
		</div>
	)
}
