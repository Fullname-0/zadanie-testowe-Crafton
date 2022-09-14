export class MenuItem {
    name
    link

    constructor(name, link) {
        this.name = name;
        this.link = link;
    }
}

class Menu {
    menuItem

    constructor(menuItem) {
        this.menuItem = menuItem
    }

    static fromApiResponse(data) {
        const mainMenu = [];
        data.data[0].content.menu.map((item, index) => {
            if(item) {
                const menu = new MenuItem(item.name, item.link);
                mainMenu.push(new Menu(menu))
            }
        })
        return mainMenu;
    }
}


export default Menu;
