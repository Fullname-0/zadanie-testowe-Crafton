import '../../assets/scss/footer/footer.scss';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Marker} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import Mark from '../../assets/images/map-mark.png';
import {Link} from "react-router-dom";

const Footer = ({content}) => {
    const mapIcon = new Icon({
        iconUrl: Mark,
        iconSize: [35, 50]
    });

    const arrOfMenuItem = []

    const menuHandler = () => {
        for (const element in content.menu) {
            arrOfMenuItem.push(content.menu[element])
        }
    }

    menuHandler()

    return (
        <footer className="footer">
            <div className="footer-container">
                <address className="footer-container__address">
                    <p>{content.address.street}</p>
                    <p>{content.address.zipCode}</p>
                    <p>{content.address.phone}</p>
                    <MapContainer center={[content.cords[0], content.cords[1]]} zoomControl={false} className="map" zoom={15} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={content.cords} icon={mapIcon} />
                    </MapContainer>
                </address>
                <div className="footer-container__menu">
                    {arrOfMenuItem.map((item, index) => {
                        return (
                            <div className="footer-container__menu-links" key={index}>
                                {item.map((a, index) => {
                                    return (
                                        <Link key={index} to={a.link}>{a.name}</Link>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="footer-container__realization">
                    <p>Projekt i realizacja: Crafton</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
