import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
        signOut: "http://187.111.192.23:8002"
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
