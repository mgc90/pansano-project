import "./Galery.css"



import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import axios from 'axios';

const Galery = () => {
    const [images, setImages] = useState(null);
   
    
    useEffect(() => {
        axios("galery.json").then((res) =>  setImages(res.data)
    );
    }, []); 


    
    

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} className="galery-img" />;
    };

   

    return (
        <div className='galery'>
            <Galleria value={images}  numVisible={3} showIndicators 
                 
                item={itemTemplate}  autoPlay transitionInterval={5000} showThumbnails={false}
                changeItemOnIndicatorHover showItemNavigators circular 
                />
        </div>
    )
}
        

export default Galery