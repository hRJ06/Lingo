import {StickyWrapper} from "@/components/StickWrapper";
import {FeedWrapper} from "@/components/FeedWrapper";
import {Header} from "@/app/(main)/learn/Header";
import {UserProgress} from "@/components/UserProgress";
import {getUnits, getUserProgress} from "@/db/queries";
import {redirect} from "next/navigation";

const page = async () => {
    const unitsPromise = getUnits();
    const userProgressPromise = getUserProgress();
    const [userProgress, units] = await Promise.all([userProgressPromise, unitsPromise])
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
                {
                    units.map((unit) => (
                        <div key={unit.id} className='mb-10'>
                            {
                                JSON.stringify(unit)
                            }
                        </div>
                    ))
                }
            </FeedWrapper>
        </div>
    )
}

export default page