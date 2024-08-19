import MobileHeader from "@/components/MobileHeader";
import {Sidebar} from "@/components/Sidebar";
import {PropsWithChildren} from "react";


const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <MobileHeader />
            <Sidebar className="hidden lg:flex" />
            <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
                <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
            </main>
        </>
    );
};

export default MainLayout;
