import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, req) {
                const {email, password} = credentials;
                const res = await fetch("https://backend-market.tmsiti.uz/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else return null;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token, user}) {
            session.user = token;
            return session;
        }
    },
    // session: {
    //     strategy: "jwt"
    // },
    pages: {
        signIn: "/auth/login",
    },
    secret:'secret'
}
export default NextAuth(authOptions)