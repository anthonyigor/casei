import { verify } from "jsonwebtoken";
import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                const data = await res.json()
                try {
                    const decoded = verify(data.token, process.env.JWT_SECRET as string)
                    if (decoded) {
                        if (typeof decoded === 'object' && 'user' in decoded) {
                            const user = (decoded as { user: string }).user;
                            return { ...user as any, token: data.token };
                        }
                    }
                } catch (error) {
                    return null
                }
                
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            const customUser = user as unknown as any

            if (user) {
                return {
                    ...token,
                    id: customUser.id,
                    token: customUser.token,
                }
            }

            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    email: token.email,
                    name: token.name,
                    id: token.id,
                    token: token.token
                }
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(process.env.NEXT_PUBLIC_FRONTEND_URL!)) {
                return url;
            }
            return baseUrl;
        }
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60 // 30 days   
    },
    secret: process.env.NEXTAUTH_SECRET
}
