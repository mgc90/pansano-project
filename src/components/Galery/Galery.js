import "./Galery.css"

import ImageGallery from "react-image-gallery";
import React, { useRef } from 'react';

const Galery = () => {
    const galleryRef = useRef(null);

    const handleMouseEnter = () => {
        if (galleryRef.current) {
            galleryRef.current.pause();
        }
    };

    const handleClick = () => {
        if (galleryRef.current) {
            galleryRef.current.pause();
        }
    };

   
    const images = [
        {
            
            original: "imgs/pansanoBanner3.jpg",
            originalTitle: "Panadería Artesanal de Masa Madre Agroecológica",
            description: ""
        },
        {
            
            original: "imgs/visitanos2.jpg",
            originalTitle: "Conocé nuestro local.",
            description: (
                <div>
                    <div>
                        <a href="https://maps.app.goo.gl/QZuihPry3iFSL4uD8" target="_blank" rel="noreferrer" >
                            <h2><i className="pi pi-map-marker contactLink" />   Ubicación</h2>
                        </a>
                    
                    </div>
                    <div>
                        <a href="https://wa.link/jf11ed" target="_blank" rel="noreferrer" >
                            <h2><i className="pi pi-whatsapp contactLink" />   2665-247404</h2>
                        </a>
                    
                    </div>
                    <div>
                        <a href="https://www.instagram.com/pansano.sl/" target="_blank" rel="noreferrer" >
                            <h2><i className="pi pi-camera contactLink"  />   @pansano.sl</h2>
                        </a>
                    
                    </div>
                    <div>
                        <a href="https://www.facebook.com/profile.php?id=100072216714324" target="_blank" rel="noreferrer" >
                            <h2><i className="pi pi-facebook contactLink" />   PAN SANO</h2>
                        </a>
                    </div>
                </div>
            )
        },
        {
            
            original: "imgs/envios.jpg",
            originalTitle: "Hacemos Envíos!",
            description: ""
        },
        {
            
            original: "imgs/agroeco.jpg",
            originalTitle: "Utilizamos productos agroecológicos.",
            description: ""
        }
    ];

    const renderItem = (item) => {
        return (
            <div style={{ position: 'relative' }}>
                <img src={item.original} alt={item.description} style={{ width: '100%', borderRadius: "2cap"}} 
                 
                />
                {item.description && (
                    <div className="image-gallery-description">{item.description}</div>
                )}
            </div>
        );
    };

    return (
        <div className='galery'>
            <ImageGallery items={images} ref={galleryRef}
            showBullets={true} showFullscreenButton={false} 
            showPlayButton={false}  slideDuration={700}
            slideInterval={10000} renderItem={renderItem}
            onMouseEnter={handleMouseEnter} onClick={handleClick}  
            autoPlay={true}
            
             />
        </div>
    )
}
        

export default Galery