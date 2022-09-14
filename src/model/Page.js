import Block from "./Block";
import getComponents from "../components/getComponents";

class Page {
    title;
    blocks;

    constructor(title, blocks) {
        this.title = title;
        this.blocks = blocks;
    }

    static fromApiResponseHeader(data) {
        const header = [];
        data.data.forEach((item) => {
            if(item.component === 'header') {
                const blocks = new Block(item.component, item.content);
                header.push(new Page(item.component, blocks))
            }
        })
        return header;
    }

    static fromApiResponse(data) {
        const pages = [];
        data.data.forEach((item) => {
            if(item.component !== 'header' && item.component !== 'footer') {
                const blocks = new Block(item.component, item.content);
                pages.push(new Page(item.component, blocks))
            }
        })
        return pages;
    }

    static fromApiResponseFooter(data) {
        const footer = [];
        data.data.forEach((item) => {
            if(item.component === 'footer') {
                const blocks = new Block(item.component, item.content);
                footer.push(new Page(item.component, blocks))
            }
        })
        return footer;
    }

    toComponents(index) {
        const components = getComponents(this.blocks, index);
        return <>{components}</>
    }

}

export default Page;
