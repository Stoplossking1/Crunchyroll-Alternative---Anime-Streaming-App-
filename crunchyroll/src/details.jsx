import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Season from './season';
import Artist from './Artist';
import './index.css';
import { svrURL } from './constants';


export function Details() {
    const { tvshowId } = useParams();
    const [tvshow, setTvshow] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getTvshow() {
            try {
                const response = await fetch(`${svrURL}/tvshow?tvshowId=${tvshowId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch TV show details');
                }
                const data = await response.json();
                setTvshow(data);
            } catch (err) {
                setError(err.message);
                document.getElementById('error-message').focus();
            }
        }
        getTvshow();
    }, [tvshowId]);

    return (
        <div className="section" role="main">
            {error && (
                <div tabIndex="-1" id="error-message" role="alert" className="notification is-danger">
                    {error}
                </div>
            )}
            {tvshow ? (
                <div className="container">
                    <div className="columns is-variable is-8">
                        <div className="column is-4" role="img" aria-label={`Poster of ${tvshow.title}`}>
                            <figure className="image is-4by3">
                                <img src={tvshow.imgURL} alt={`Poster of ${tvshow.title}`} />
                            </figure>
                        </div>
                        <div className="column" role="article" aria-labelledby="tvshow-title">
                            <h1 id="tvshow-title" className="title">{tvshow.title}</h1>
                            <p><strong>Rating:</strong> {tvshow.rating}</p>
                            <p><strong>Year:</strong> {tvshow.year}</p>
                            <p><strong>Episodes:</strong> {tvshow.episodeCount}</p>
                            <p><strong>Parental Guideline:</strong> {tvshow.tvParentalGuideline}</p>
                            <p><strong>Studio:</strong> {tvshow.studio.name}</p>
                            <p><strong>Genres:</strong> {tvshow.genres.map(genre => genre.name).join(', ')}</p>
                            <p><strong>Plot:</strong> {tvshow.plot}</p>
                            <audio controls src={tvshow.audioURL} aria-label={`Audio of ${tvshow.title}`}>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    <h2 className="subtitle">Cast</h2>
                    <div className="horizontal-scroll" role="list">
                        <div className="columns is-variable is-1">
                            {tvshow.roles.map(role => (
                                <div key={role.roleId} className="column is-narrow" role="listitem">
                                    <Artist role={role} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 className="subtitle">Seasons</h2>
                    <div className="horizontal-scroll" role="region" aria-labelledby="seasons-title">
                        <h3 id="seasons-title" className="subtitle"></h3>
                        <div className="columns is-variable is-1">
                            {tvshow.seasons.map(season => (
                                <div key={season.seasonId} className="column is-narrow" role="listitem">
                                    <Season season={season} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="content has-text-centered" role="status">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}

export default Details;
