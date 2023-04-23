import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const {username, password} = credentials;
                const res = await fetch("https://backend-market.tmsiti.uz/api/v1/dj-rest-auth/login/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });

                const user = await res.json();
                console.log({user});

                if (res.ok && user) {
                    return user;
                } else return null;
            }
        })
    ],
    // callbacks: {
    //     async jwt({ token, user }) {
    //         return { ...token, ...user };
    //     },
    //     async session({ session, token, user }) {
    //         session.user = token;
    //
    //         return session;
    //     },
    // },

    pages: {
        signIn: "/auth/login",
    }
}
export default NextAuth(authOptions)