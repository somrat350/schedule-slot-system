import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },

  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
