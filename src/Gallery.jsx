import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useGlobalContext } from "./context";

const url =
    `https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_API_KEY}`;

const Gallery = () => {
    const { searchTerm } = useGlobalContext();

    const response = useQuery({
        queryKey: ["images", searchTerm],
        queryFn: async () => {
            const result = await axios.get(`${url}&query=${searchTerm}`);
            return result.data;
        },
    });

    // console.log(response);
    if (!searchTerm) {
        return (
            <section className='image-container'>
                <h2>Please enter the keywords</h2>
            </section>
        );
    }

    if (response.isLoading) {
        return (
            <section className="image-container">
                <h4>Loading...</h4>
            </section>
        );
    }

    if (response.isError) {
        return (
            <section className="image-container">
                <h4>There was an error!</h4>
            </section>
        );
    }

    const results = response.data.results;

    if (results.length < 1) {
        return (
            <section className="image-container">
                <h2>No result found</h2>
                <p>Try something different</p>
            </section>
        );
    }

    return (
        <section className="image-container">
            {results.map((item) => {
                const imgURL = item?.urls?.regular;
                return (
                    <img
                        src={imgURL}
                        key={item.id}
                        alt={item.alt_description}
                        className="img"></img>
                );
            })}
        </section>
    );
};

export default Gallery;
