import {cache} from 'react'
import db from "@/db/dirzzle";

export const getCourses = cache(async () => {
    return db.query.courses.findMany();
})