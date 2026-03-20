import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",

      credentials: {
        username: {},
        password: {}
      },

      async authorize(credentials) {

        if (!credentials) return null

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username }
        })

        if (!admin) return null

        const valid = await bcrypt.compare(
          credentials.password,
          admin.password
        )

        if (!valid) return null

        return {
          id: admin.id,
          name: admin.username
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60   // 8 hours
  },

  jwt: {
    maxAge: 8 * 60 * 60   // 8 hours
  },

  pages: {
    signIn: "/admin-login"
  }
})

export { handler as GET, handler as POST }