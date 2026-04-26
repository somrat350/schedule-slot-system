import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const teacher = {
          id: "1",
          name: "Teacher",
          email: "teacher@test.com",
          password: "teacher123",
          role: "teacher",
        };

        const student = {
          id: "2",
          name: "Student",
          email: "student@test.com",
          password: "student123",
          role: "student",
        };

        if (
          credentials?.email === teacher.email &&
          credentials?.password === teacher.password
        ) {
          return teacher;
        }

        if (
          credentials?.email === student.email &&
          credentials?.password === student.password
        ) {
          return student;
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
