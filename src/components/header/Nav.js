import {Link} from "react-router-dom";
import {useContext, useLayoutEffect, useRef, useState} from "react";
import ContentContext from "../../store/content-context";
import '../../assets/scss/header/nav.scss';
import Burger from "../../ui/Burger";

const Nav = ({logo, logoDark, matches, bottom}) => {
    const {menu} = useContext(ContentContext);
    const [match, setMatch] = useState(false);
    const refMenu = useRef(null);

    useLayoutEffect(() => {
        if(!matches) {
            const {height} = refMenu.current.getBoundingClientRect()
            const handleScroll = (event) => {
                 setMatch(bottom - height <= 0)
            };
            window.addEventListener('scroll', handleScroll, true);
        }
    }, [bottom, matches, match]);

    return (
        <>
            {matches ? <Burger menu={menu} bottom={bottom} logo={logo} logoDark={logoDark} /> :
                <nav ref={refMenu} className={`nav-container ${match ? 'nav-container--color' : ''}`}>
                    <div>
                        {match ? <img src={logoDark} alt="Logo uniwersytetu"/> : <img src={logo} alt="Logo uniwersytetu" />}
                        <div className="nav-container__items">
                            {menu.map((item, index) => {
                                return <Link className={`nav-container__link ${match ? 'nav-container__link--color' : ''}`} to={item.menuItem.link} key={index}>{item.menuItem.name}</Link>
                            })}
                        </div>
                    </div>
                </nav>
            }
        </>
    )
}

export default Nav
