import React, { useEffect, useState } from 'react';
import { Carousel as BootstrapCarousel } from 'bootstrap';

export default function Carousel() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (images.length > 0) {
            const element = document.getElementById('carouselExampleFade');
            new BootstrapCarousel(element);
        }
    }, [images]);

    useEffect(() => {

        const categories = ["burger", "momos", "biryani"];

        Promise.all(
            categories.map(food =>
                fetch(`https://foodish-api.com/api/images/${food}`)
                    .then(res => res.json())
            )
        )
        .then(results => {
            const urls = results.map(data => data.image);
            setImages(urls);
        })
        .catch(err => console.log("API Error:", err));

    }, []);

    if (images.length === 0) {
        return <div className="text-center p-5">Loading...</div>;
    }   

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
            <div className="carousel-inner" id = "caraousel-inner">

                <div className="carousel-caption" style={{zIndex: 10}}> 
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        style={{filter: "brightness(30%)"}}
                    >
                        <img
                            src={img}
                            className="d-block w-100"
                            alt="food"
                        />
                    </div>
                ))}

            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon"></span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon"></span>
            </button>

        </div>
    );
}
