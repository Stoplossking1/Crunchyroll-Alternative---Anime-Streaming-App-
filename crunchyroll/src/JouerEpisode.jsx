import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './AuthContext';
import { svrURL } from './constants';


const JouerEpisode = () => {
    const { episodeId } = useParams();
    const [videoURL, setVideoURL] = useState('');
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError('You need to be logged in to watch episodes.');
            return;
        }

        async function fetchEpisode() {
            try {
                const response = await fetch(`${svrURL}/viewepisode?episodeId=${episodeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch episode data');
                }

                const data = await response.json();
                setVideoURL(data.videoURL);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchEpisode();
    }, [episodeId, token]);

    if (!token) {
        return (
            <div className="container">
                <h1 className="title">Watch Episode</h1>
                <div tabIndex="-1" role="alert" className="notification is-warning">
                    {error}
                </div>
                <button className="button is-link" onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="title">Watch Episode</h1>
            {error && (
                <div tabIndex="-1" role="alert" className="notification is-danger">
                    {error}
                </div>
            )}
            {videoURL ? (
                <video controls src={videoURL} aria-label="Episode video">
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default JouerEpisode;
