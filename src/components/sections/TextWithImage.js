import '../../assets/scss/sections/text-with-image.scss';
import '../../assets/scss/sections/video.scss';
import arrow from '../../assets/images/arrow.png';
import playButton from '../../assets/images/play-button.png';
import {useState} from "react";

const TextWithImage = ({content}) => {

    const [openVideo, setOpenVideo] = useState(false)

    const openVideoHandler = () => {
        setOpenVideo(!openVideo)
    }

    return (
        <section className={`section ${content.background ? 'section--background-color' : ''}`}>
            <div className="container">
                <div className={`container__content ${content.imageLeft ? 'container__content--reverse' : ''}`}>
                    <div className={`container__describtion ${content.imageLeft ? 'container__describtion--reverse' : ''}`}>
                        <h2 className="container__header">{content.title}</h2>
                        <p className="container__paragraph">{content.mainText}</p>
                        {content.secondText && <p className="container__paragraph container__paragraph--margin-top">{content.secondText}<a className="container__link" href="/">{content.subscribeLink}</a>.</p>}
                        {content.requirementsTitle && <p className="container__paragraph container__paragraph--big-margin-top">{content.requirementsTitle}</p>}
                        {content.requirements.map((item, index) => {
                            return <p className="container__paragraph container__paragraph--margin" key={index}><span className="container__paragraph--margin-right"><img src={arrow} alt="symbol" /></span>{item.subscribe}</p>
                        })}
                    </div>
                    <div className="container__image">
                        {content.linkVideo &&
                                <div className="container__image__button" onClick={openVideoHandler}>
                                    <img src={playButton} alt="Button play" />
                                </div>
                        }
                        <img className="picture" src={content.images.url} alt={content.images.alt} />
                    </div>
                </div>
                {openVideo &&
                    <>
                        <div className="overlay" onClick={openVideoHandler}></div>
                        <div className="video">
                            <iframe src={content.linkVideo}
                                title={content.titleOfVideo}
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" autoPlay={openVideo}
                                allowFullScreen
                            />
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default TextWithImage
