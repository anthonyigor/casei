import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/"
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