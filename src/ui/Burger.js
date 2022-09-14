import {Link} from "react-router-dom";
import '../assets/scss/header/burger.scss';
import {useRef, useState, useLayoutEffect} from "react";

const Burger = ({menu, bottom, logo, logoDark}) => {

    const [openBurger, setOpenBurger] = useState(false)
    const [match, setMatch] = useState(false)
    const refBurger = useRef(null)

    useLayoutEffect(() => {
        const handleScroll = (event) => {
            const {width} = refBurger.current.getBoundingClientRect()
            setMatch(bottom - width <= 0)
        };
        window.addEventListener('scroll', handleScroll, true);
    });

    return (
        <>
            {!openBurger && <img className="logo" src={logo} alt="Logo uniwersytetu" />}
            <div ref={refBurger} className={`burger ${match ? 'burger--color' : ''} ${openBurger ? 'open' : ''}`} onClick={()=>setOpenBurger(!openBurger)} />
            {openBurger &&
                <div className="burger-container">
                    <img src={logoDark} alt="Logo uniwersytetu" />
                    {menu.map((item, index) => {
                        return <Link className="burger-container__link burger-container__link--color" to={item.menuItem.link} key={index}>{item.menuItem.name}</Link>
                    })}
                </div>
            }
        </>
    )
}

export default Burger
