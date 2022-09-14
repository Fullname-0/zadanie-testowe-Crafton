import Header from "./header/Header";
import TextWithImage from "./sections/TextWithImage";
import Form from "./form/Form";
import Footer from "./footer/Footer";

const getComponents = (blocks, index) => {
    switch(blocks.component) {
        case "header": return <Header key={index} content={blocks.content}/>
        case "text_with_image": return <TextWithImage key={index} content={blocks.content}/>
        case "form": return <Form key={index} content={blocks.content}/>
        case "footer": return <Footer key={index} content={blocks.content} />
        default: return <></>
    }
}

export default getComponents;
