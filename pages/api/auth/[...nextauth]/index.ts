import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password }: any = credentials;

        if (!credentials) return null;

        const user = await prisma.utilisateur.findUnique({
          where: { email: email },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        const client = await prisma.client.findFirst({
          where: { id_utilisateur: user.id_utilisateur },
        });

        if (client && !user.isAdmin) {
          return {
            id: user.id_utilisateur.toString(),
            id_client: client.id_client,
            email: user.email,
            name: user.nom + " " + user.prenom,
            userRole: user.isAdmin ? "Administrateur" : "Client",
            image: user.photo_profil,
            utilisateur: user,
            client: client,
          };
        }

        return {
          id: user.id_utilisateur.toString(),
          email: user.email,
          name: user.nom + " " + user.prenom,
          userRole: user.isAdmin ? "Administrateur" : "Client",
          image: user.photo_profil,
          utilisateur: user,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
