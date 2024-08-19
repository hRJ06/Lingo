import {StickyWrapper} from "@/components/StickWrapper";
import {FeedWrapper} from "@/components/FeedWrapper";
import {Header} from "@/app/(main)/learn/Header";
import {UserProgress} from "@/components/UserProgress";

const page = () => {
    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress
                    activeCourse={{title: "Spanish", imageSrc: "/es.svg"}}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title='Spanish'/>
            </FeedWrapper>
        </div>
    )
}

export default page