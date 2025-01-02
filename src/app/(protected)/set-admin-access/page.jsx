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
				<button>Get Admin Access</button>
			</form>
		</div>
	)
}

export default Page
