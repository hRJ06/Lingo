import {cache} from 'react'
import db from "@/db/dirzzle";

export const getCourses = cache(async () => {
    return await db.query.courses.findMany();
})