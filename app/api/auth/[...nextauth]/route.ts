import NextAuth from 'next-auth/next';
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github';

import User from '@models/User';
import { connect } from '@utils/db';

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user?.email
            });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connect();
                // Converte Profile para um GitHub Profile.
                const githubProfile = profile as GithubProfile;
                    // Verifica se usuário já existe.
                const userExists = await User.findOne({ email: githubProfile?.email });
                // Caso não exista, cria um novo usuário.
                if (!userExists) {
                    await User.create({
                        email: githubProfile?.email,
                        username: githubProfile?.name?.replace(" ", "").toLowerCase(),
                        image: githubProfile?.avatar_url,
                    });
                }
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
