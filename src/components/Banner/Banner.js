import "./Banner.css";
import { assetUrl } from "../../utils/assets";

const Banner = () => {
  return (
    <div className="banner">
        <div className="bannerContainer">
            <h1><img alt="logoBlanco" className="mainLogo" src={assetUrl("imgs/pansanoLogoBlanco.png")} /> </h1>
            <h2>Panadería Artesanal Agroecológica de Masa Madre</h2>
            <h3>Juana Koslay, San Luis, Argentina</h3>
        </div>
    </div>
  )
}

export default Banner