import z from "zod";

const env = z.object({
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
}).safeParse(process.env)

if (!env.success) {
    console.error(env.error.issues);
    throw new Error("Error with the environment variables");
    process.exit(1);
}

const config = {
    database: env.data.DATABASE_URL,
    jwtSecret: env.data.JWT_SECRET,
};

export default config;
