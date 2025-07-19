import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { SigninValidation } from "../../types/zodTypes";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {
                    label: "Phone number",
                    type: "text",
                    placeholder: "1231231231",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "*****",
                },
            },
            // TODO: User credentials type from next-auth
            async authorize(credentials: any) {
                
                try {
                    // zod validation
                    const { success } = SigninValidation.safeParse(credentials);

                    if (!success) {
                        throw new Error("Invalid input format");
                    }

                    const hashedPassword = await bcrypt.hash(
                        credentials.password,
                        10
                    );
                    const existingUser = await db.user.findFirst({
                        where: {
                            number: credentials.phone,
                        },
                    });

                    if (existingUser) {
                        const passwordValidation = await bcrypt.compare(
                            credentials.password,
                            existingUser.password
                        );
                        if (passwordValidation) {
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                number: existingUser.number,
                            };
                        }
                        return null;
                    }

                    console.log(credentials);
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword,
                        },
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        number: user.number,
                    };
                } catch (e : any) {
                    console.log(e.message)
                }

                return null;
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub;

            return session;
        },
    },
};

/* You can create your own types in .d.ts files which are used for only declaration purposes and no js
   output is generated . You can also use "declare module" for augmenting the existing types .
   Generally we use .d.ts file when there are no types available for existing lib */
