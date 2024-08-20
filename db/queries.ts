import {cache} from 'react'
import db from "@/db/dirzzle";
import {auth} from "@clerk/nextjs/server";
import {courses, userProgress} from "@/db/schema";
import {eq} from "drizzle-orm";

export const getCourses = cache(async () => {
    return await db.query.courses.findMany();
})

export const getUserProgress = cache(async () => {
    const {userId} = await auth();
    if (!userId) return null;
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    })
    return data;
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId)
    })
    return data;
})