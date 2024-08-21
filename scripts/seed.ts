import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import * as schema from '@/db/schema';
import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http"

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, {schema});
const main = async () => {
    try {
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg"
            },
            {
                id: 2,
                title: "Italian",
                imageSrc: "/it.svg"
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg"
            },
            {
                id: 4,
                title: "Croatia",
                imageSrc: "/hr.svg"
            }
        ])
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the DB.")
    }
}
main();