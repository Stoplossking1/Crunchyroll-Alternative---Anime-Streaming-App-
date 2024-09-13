import React from 'react';
import { useNavigate } from 'react-router-dom';


const Season = ({ season }) => {
    const navigate = useNavigate();

    const handleSeasonClick = () => {
        navigate(`/season/${season.seasonId}`);
    };
    
    return (
        <div className="card" role="region" aria-labelledby={`season-title-${season.seasonId}`} onClick={handleSeasonClick} style={{ cursor: 'pointer' }}>
            <div className="card-image">
                <figure className="image">
                    <img src={season.imgURL} alt={`Poster of Season ${season.number}`} />
                </figure>
            </div>
            <div className="card-content">
                <p id={`season-title-${season.seasonId}`}><strong>Season {season.number}</strong></p>
                <p>Episodes: {season.episodeCount}</p>
            </div>
        </div>
    );
};

export default Season;
