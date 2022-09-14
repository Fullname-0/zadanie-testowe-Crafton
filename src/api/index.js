import data from "../content.json";
import Page from "../model/Page";
import Menu from "../model/Menu";

export const getMenu = async () => {
    return Menu.fromApiResponse(data)
}

export const getHeader = async () => {
    return Page.fromApiResponseHeader(data)
}

export const getAllComponents = async () => {
    return Page.fromApiResponse(data);
}

export const getFooter = async () => {
    return Page.fromApiResponseFooter(data);
}

export const sendMail = async (message) => {
    try {
        await fetch('https://universitasvarsoviensis.pl/contact.php', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                "Content-Type": 'application/json',
            }
        }).then((response) => {
            if(response.ok) {
                console.log(response)
            }
        })
    } catch(error) {
        console.error(error)
    }
}


