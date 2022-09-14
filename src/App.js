import {useContext, useEffect} from "react";
import ContentContext from './store/content-context';
import {getAllComponents} from "./api";
import './assets/scss/sections/main.scss';
import MainLayout from "./layout/MainLayout";

function App() {
    const {components, setComponents} = useContext(ContentContext);

    useEffect(() => {
        const fetchData = async () => {
            const components = await getAllComponents();
            setComponents(components);
        }
        fetchData().catch(error => console.error(error))
    }, [])

  return (
    <MainLayout>
        {components.map((page, index) => page.toComponents(`${page.title}-${index}`))}
    </MainLayout>
  );
}

export default App;
