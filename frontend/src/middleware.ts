import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
        signOut: '/'
    }
})

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/convidados/:path*",
        "/presentes/:path*",
        "/usuario",
        "/convite"
    ]
}