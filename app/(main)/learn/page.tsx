import { StickyWrapper } from "@/components/StickWrapper";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "@/app/(main)/learn/Header";
import { UserProgress } from "@/components/UserProgress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "@/app/(main)/learn/Unit";

const page = async () => {
  const unitsPromise = getUnits();
  const userProgressPromise = getUserProgress();
  const courseProgressPromise = getCourseProgress();
  const lessonPercentagePromise = getLessonPercentage();
  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressPromise,
      unitsPromise,
      courseProgressPromise,
      lessonPercentagePromise,
    ]);
  if (!userProgress || !userProgress.activeCourse || !courseProgress)
    redirect("/courses");
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress.activeLesson}
                activeLessonPercentage={lessonPercentage}
              />
            }
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default page;
