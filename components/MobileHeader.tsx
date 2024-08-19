import {MobileSidebar} from "@/components/MobileSidebar";


const MobileHeader = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-green-500 px-4 lg:hidden">
      <MobileSidebar />
    </nav>
  );
};

export default MobileHeader;
