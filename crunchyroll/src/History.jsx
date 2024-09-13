import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './AuthContext';
import { svrURL } from './constants';

const History = () => {
    const { token, history, fetchHistory } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchHistory(token);
        }
    }, [token, fetchHistory, navigate]);

    return (
        <div className="container">
            <h1 className="title">Viewing History</h1>
            {history.length === 0 ? (
                <p>No viewing history available.</p>
            ) : (
                <div className="columns is-multiline is-mobile">
                    {history.map((episode, index) => (
                        <div key={index} className="column is-4-desktop is-6-mobile">
                            <div className="card" role="region" aria-labelledby={`episode-title-${episode.episodeId}`}>
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img
                                            src={episode.imgURL}
                                            alt={`Episode ${episode.title}`}
                                            onClick={() => navigate(`/episode/${episode.episodeId}`)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <p id={`episode-title-${episode.episodeId}`}><strong>{episode.title}</strong></p>
                                    <p><a onClick={() => navigate(`/details/${episode.tvshowId}`)}>Go to Series</a></p>
                                    <p><a onClick={() => navigate(`/season/${episode.seasonId}`)}>Go to Season</a></p>
                                    <p><a onClick={() => navigate(`/episode/${episode.episodeId}`)}>Episode {episode.episodeNumber}</a></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
