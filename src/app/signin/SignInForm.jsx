"use client"

import { Controller, useForm } from "react-hook-form"
import { signIn } from "../../lib/firebase/auth"
import { useRouter } from "next/navigation"

function SignInForm() {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const router = useRouter()

	async function submitValues(data) {
		try {
			const signInResult = await signIn(data.email, data.password)

			console.log("signInResult", signInResult)

			if (signInResult) router.push("/profile")
		} catch (error) {
			console.error("Error signing in with email and password", error)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit(submitValues)}>
				<div>
					<label htmlFor="emailInput">Email</label>
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<input
								id="emailInput"
								type="email"
								{...field}
							/>
						)}
					/>
				</div>
				<div>
					<label htmlFor="passwordInput">Password</label>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<input
								id="passwordInput"
								type="password"
								{...field}
							/>
						)}
					/>
				</div>
				<button>Sign In</button>
			</form>
		</div>
	)
}

export default SignInForm
