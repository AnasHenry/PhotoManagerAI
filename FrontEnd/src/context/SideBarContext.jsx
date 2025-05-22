import React, {useState, useContext, createContext, useEffect} from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({children }) => {
    const [isCollapsed, setCollapsed] = useState(false);
    useEffect(()=>{
        const stored = localStorage.getItem('sidebarCollapsed') === 'true';
        setCollapsed(stored);
    }, []); 

    const toggleCollapse = () =>{
        const newval = !isCollapsed;
        localStorage.setItem('sidebarCollapsed', newval.toString());
        setCollapsed(newval); 
    }

    return(
        <SidebarContext.Provider value={{isCollapsed, toggleCollapse}}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => useContext(SidebarContext);