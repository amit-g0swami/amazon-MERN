import React from 'react'
import Product from '../product/Product'
import "./Home.css"

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className='home__image' src="https://cdn.wallpapersafari.com/17/87/Y2a7Je.jpg" alt="" />
                <div className="home__row">
                    <Product
                        id="499550"
                        title="Don't go there"
                        price={29.99}
                        image="https://marketplace.canva.com/EAD7YH8bebE/1/0/251w/canva-white-bold-text-thriller-mystery-book-cover-CejxvxrTCyg.jpg"
                        rating={5}
                    />
                    <Product
                        id="755888"
                        title="Iittala Artik 16 piece stainless steel"
                        price={170.0}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/61XziXOiMjL._AC_UL320_SR320,320_.jpg"
                    />
                </div>
                <div className="home__row">
                    <Product
                        id="123445"
                        title="Anne Klein Women's Bracelet Watch"
                        price={26.99}
                        rating={4}
                        image="https://cdn.creationwatches.com/products/images/large/SKW2749_LRG.jpg"
                    />
                    <Product
                        id="999228"
                        title="Evenflo Pivot Xplore Double Stroller Wagon"
                        price={209.99}
                        rating={3}
                        image="https://images.baby-toys.biz/l-m/evenflo-pivot-xplore-double-stroller-wagon-all-v-3884359229.jpg"
                    />
                    <Product
                        id="882111"
                        title="Webcam 1080P with Microphone, PC Laptop Desktop USB Webcams with 110 Degree Wide Angle"
                        price={29.99}
                        rating={2}
                        image="https://i5.walmartimages.com/asr/0a9e4113-2a58-4e0c-b908-0782f9c54811.c9402c66d7b0506d071b9de5a5b7fe8e.jpeg"
                    />
                </div>
                <div className="home__row">
                    <Product
                        id="129933"
                        title="Egyptian Cotton 1000 Thread Count Ultra Soft Pillow"
                        price={999.99}
                        rating={5}
                        image="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6115/6115611_sd.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home