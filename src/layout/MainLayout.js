import {useContext, useEffect} from "react";
import ContentContext from "../store/content-context";
import {getFooter, getHeader, getMenu} from "../api";

const MainLayout = (props) => {

    const {header, footer, setHeader, setMenu, setFooter} = useContext(ContentContext);

    useEffect(() => {
        const fetchData = async () => {
            const header = await getHeader();
            const menu = await getMenu();
            const footer = await getFooter();
            setHeader(header);
            setMenu(menu);
            setFooter(footer);
        }
        fetchData().catch(error => console.error(error))
    }, [])

    return (
        <>
            {header.map((page, index) => page.toComponents(page.title))}
            <main className="main">
                {props.children}
            </main>
            {footer.map((page, index) => page.toComponents(page.title))}
        </>
    )
}

export default MainLayout
