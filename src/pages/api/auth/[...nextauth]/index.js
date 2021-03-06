import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import dbPromise from '@/modules/mongodb'
import { compare } from 'bcrypt'

export default NextAuth({
  adapter: MongoDBAdapter(dbPromise),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'me@you.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const dbConnection = await dbPromise
        const user = await dbConnection
          .db()
          .collection('users')
          .findOne({ email: credentials.email })

        const json = {
          _id: user._id.toString(),
          email: user.email,
          type: user.type,
        }

        return (await compare(credentials.password, user.hashedPassword))
          ? json
          : null
      },
    }),
  ],
})
