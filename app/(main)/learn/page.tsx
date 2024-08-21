import {StickyWrapper} from "@/components/StickWrapper";
import {FeedWrapper} from "@/components/FeedWrapper";
import {Header} from "@/app/(main)/learn/Header";
import {UserProgress} from "@/components/UserProgress";
import {getUserProgress} from "@/db/queries";
import {redirect} from "next/navigation";

const page = async () => {
    const userProgressPromise = getUserProgress();
    const [userProgress] = await Promise.all([userProgressPromise])
    if (!userProgress || !userProgress.activeCourse) redirect("/courses")
    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}/>
            </FeedWrapper>
        </div>
    )
}

export default page