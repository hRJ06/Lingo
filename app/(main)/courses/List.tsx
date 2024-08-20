"use client"
import {courses, userProgress} from "@/db/schema";
import {Card} from "@/app/(main)/courses/Card";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {upsertUserProgress} from "@/actions/user-progess.actions";

type Props = {
    courses: typeof courses.$inferSelect[],
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId,
}

export const List = ({courses, activeCourseId}: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const onClick = (id: number) => {
        if(pending) return;
        if(id === activeCourseId) return router.push("/learn");
        startTransition(() => {
            upsertUserProgress(id);
        })
    }
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
            {
                courses.map((course) => (
                    <Card
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        imageSrc={course.imageSrc}
                        onClick={onClick}
                        disabled={pending}
                        active={course.id === activeCourseId}
                    />
                ))
            }
        </div>
    )
}