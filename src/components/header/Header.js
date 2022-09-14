import Nav from "./Nav";
import '../../assets/scss/header/header.scss';
import ArrowLeft from "../../ui/ArrowLeft";
import ArrowRight from "../../ui/ArrowRight";
import {useLayoutEffect, useRef, useState} from "react";
import {useMediaQuery} from "../../hooks/useMediaQuery";

const Header = ({content}) => {
    const [current, setCurrent] = useState(0);
    const [bottom, setBottom] = useState(0)
    let matches = useMediaQuery('(max-width: 700px)')

    const nextImage = () => {
        setCurrent(current === content.images.length - 1 ? 0 : current + 1)
    }

    const prevImage = () => {
        setCurrent(current === 0 ? content.images.length - 1 : current - 1)
    }

    const ref = useRef(null);

    useLayoutEffect(() => {
        const handleScroll = (event) => {
            const {bottom} = ref.current.getBoundingClientRect()
            setBottom(bottom)
        };
        window.addEventListener('scroll', handleScroll, true);
    }, [bottom]);

    return (
        <header className="header">
            <div className="header-container">
                {content.images.map((item, index) => {
                    return <img ref={ref} className={`header-container__image ${index === current ? 'header-container__image--active' : 'header-container__image--disactive'}`} src={item.url} alt={item.alt} key={index} />
                })}
                <Nav logo={content.logo} logoDark={content.logoDark} matches={matches} bottom={bottom} />
                <div className="header-container__title">
                    <h1 className="header-container__title-text">{content.images[current].title}<br /><span className="header-container__title-text--span">{content.images[current].subtitle}</span></h1>
                    <div className="header-container__title-box">
                        <button className="header-container__title-box-button">{content.buttonSeeMore}</button>
                        <button className="header-container__title-box-button header-container__title-box-button--background">{content.buttonAction}</button>
                    </div>
                    <div className="header-container__title__arrow">
                        <div onClick={prevImage} className="header-container__title__arrow-left">
                            <ArrowLeft />
                        </div>
                        <div onClick={nextImage} className="header-container__title__arrow-right">
                            <ArrowRight  />
                        </div>
                    </div>
                </div>
                <div className="header-container__dot">
                    {content.images.map((item, index) => {
                        return <div className={`header-container__dot-item ${index === current ? 'header-container__dot-item--active' : ''}`} key={index} onClick={()=>setCurrent(index)} />
                    })}
                </div>
            </div>
        </header>
    )
}

export default Header
