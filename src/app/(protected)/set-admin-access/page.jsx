import { revalidatePath } from "next/cache"
import { setAdminAccess } from "../../../lib/firebase/firebase-admin/user"
import { redirect } from "next/navigation"

async function Page() {
	return (
		<div>
			<form
				action={async () => {
					"use server"
					await setAdminAccess()
					revalidatePath("/")
					redirect("/admin")
				}}
			>
				<button className="w-[120px] h-[60px] flex items-center justify-center border-2 border-white rounded-2xl">
					Get Admin Access
				</button>
			</form>
		</div>
	)
}

export default Page
