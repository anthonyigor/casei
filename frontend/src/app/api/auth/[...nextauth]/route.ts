import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verify } from 'jsonwebtoken'



export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {

                const res = await fetch('http://localhost:5000/users/login', {
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
                            return user as any
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
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }