import { createContext, useEffect, useState, ReactNode } from "react";
import useScreenWidth from "../hooks/useScreenWidth";

interface contextState {
  sideBarShown: boolean;
  setSideBarShown: React.Dispatch<React.SetStateAction<boolean>>;
  renderSidebar: boolean;
  setRenderSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showContent: boolean;
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
}

type SidebarContextProviderProps = {
  children: ReactNode;
};

export const SidebarContext = createContext<contextState>({} as contextState);

export const SidebarContextProvider = ({
  children,
}: SidebarContextProviderProps) => {
  const useWindowSize = useScreenWidth();
  const [sideBarShown, setSideBarShown] = useState<boolean>(false);
  const [renderSidebar, setRenderSidebar] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(true);

  useEffect(() => {
    if (useWindowSize.width >= 800) {
      //console.log("large screen", useWindowSize.width);
      //console.log(useWindowSize.width);
      setRenderSidebar(true);
      setShowContent(true);
    }
    if (useWindowSize.width <= 800 && sideBarShown) {
      setShowContent(false);
      setRenderSidebar(true);
    }
    if (useWindowSize.width <= 800 && !sideBarShown) {
      setShowContent(true);
      setRenderSidebar(false);
    }
  }, [useWindowSize, sideBarShown]);

  return (
    <SidebarContext.Provider
      value={{
        sideBarShown,
        setSideBarShown,
        renderSidebar,
        setRenderSidebar,
        showContent,
        setShowContent,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
