import {createContext, useState} from "react";

export const ContentContextProvider = (props) => {
    const [components, setComponents] = useState([])
    const [menu, setMenu] = useState([])
    const [header, setHeader] = useState([])
    const [footer, setFooter] = useState([])

    const dataHandler = (value) => {
        setComponents(value)
    }

    const menuHandler = (value) => {
        setMenu(value)
    }

    const headerHandler = (value) => {
        setHeader(value)
    }

    const footerHandler = (value) => {
        setFooter(value)
    }

    const contextValue = {
        components,
        menu,
        header,
        footer,
        setComponents: dataHandler,
        setMenu: menuHandler,
        setHeader: headerHandler,
        setFooter: footerHandler
    };

    return <ContentContext.Provider value={contextValue}>{props.children}</ContentContext.Provider>
}

const ContentContext = createContext({
    menu: [],
    components: [],
    header: [],
    footer: [],
    setComponents: () => [],
    setHeader: () => [],
    setFooter: () => []
});

export default ContentContext;

