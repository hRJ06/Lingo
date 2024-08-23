import {PropsWithChildren} from "react";

const LessonLayout = ({children}: PropsWithChildren) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col h-full w-full'>
                {children}
            </div>
        </div>
    )
}

export default LessonLayout;