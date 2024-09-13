import React from 'react';

const Episode = ({ episode }) => {
    return (
        <div className="card" role="region" aria-labelledby={`episode-title-${episode.episodeId}`}>
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={episode.imgURL} alt={`Episode ${episode.number}: ${episode.title}`} />
                </figure>
            </div>
            <div className="card-content">
                <p id={`episode-title-${episode.episodeId}`}><strong>{episode.title}</strong></p>
                <p>{episode.number}</p>
            </div>
        </div>
    );
};

export default Episode;
