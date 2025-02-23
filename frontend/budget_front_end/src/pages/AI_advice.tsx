import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useContext } from "react";
import { SidebarContext } from "../context/sidebar_context";

const AI_advice = () => {
  const { setSideBarShown, renderSidebar, showContent } =
    useContext(SidebarContext);

  return (
    <>
      <Header></Header>
      <div className="flex flex-row w-full">
        {renderSidebar && <Sidebar></Sidebar>}
        {showContent && <p>ai advice test</p>}
      </div>
    </>
  );
};

export default AI_advice;
