import { NextResponse } from "next/server"

export async function middleware(request) {
	// console.log("path: ", request.nextUrl.pathname)
	const url = request.nextUrl.pathname
	const session = request.cookies.get("session")
	if (url.startsWith("/api/v1/auth")) return NextResponse.next()
	if (url.startsWith("/signin") || url.startsWith("/signup")) {
		if (session) return NextResponse.redirect(new URL("/profile", request.url))
		return NextResponse.next()
	}
	if (!session && (url.startsWith("/profile") || url.startsWith("/admin")))
		return NextResponse.redirect(new URL("/signin", request.url))
	// console.log("session: ", session)
	return NextResponse.next()
}

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
}
