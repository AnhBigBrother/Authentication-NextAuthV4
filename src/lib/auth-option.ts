import { UserModel } from '@/models/user-model';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcrypt';

const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'bruhh@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing credentials!');
        }
        const user = await UserModel.findOne({
          email: credentials.email,
        });
        if (!user) {
          throw new Error('User not found!');
        }
        if (user.socialAuthProvider) {
          throw new Error('Email is used as social provider!');
        }
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error('Wrong password!');
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).By default only URLs on the same URL as the site are allowed, use the redirect callback to customise that behaviour.
      return baseUrl;
    },
    async jwt({ token }) {
      // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). The returned value will be encrypted, and it is stored in a cookie.
      if (!token._id) {
        const mongoDbUser = await UserModel.findOne({ email: token.email });
        if (!mongoDbUser) {
          const newUser = {
            ...token,
            chats: [],
            socialAuthProvider: true,
          };
          await UserModel.insertOne(newUser);
          const newMongoDbUser = await UserModel.findOne({ email: token.email });
          token = { ...token, ...newMongoDbUser };
        } else {
          token = { ...mongoDbUser, ...token };
        }
      }
      return token;
    },
    async session({ session, token }) {
      // The session callback is called whenever a session is checked.
      session.user = { ...session.user, ...token };
      return session;
    },
  },
};

export { authOption };
