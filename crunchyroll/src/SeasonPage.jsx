import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Episode from './Episode';
import AuthContext from './AuthContext';
import { svrURL } from './constants';

const SeasonPage = () => {
    const { seasonId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [tvshowTitle, setTvshowTitle] = useState('');
    const [seasonNumber, setSeasonNumber] = useState('');
    const [pageCourante, setPageCourante] = useState(1);
    const taillePage = 8;
    const navigate = useNavigate();
    const { history } = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${svrURL}/episodes?seasonId=${seasonId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch season data');
                }
                const data = await response.json();
                setEpisodes(data.episodes);
                setTvshowTitle(data.tvshowTitle);
                setSeasonNumber(data.seasonNumber);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, [seasonId]);

    const nbPages = () => {
        return Math.ceil(episodes.length / taillePage);
    };

    const Paginer = () => {
        const debut = (pageCourante - 1) * taillePage;
        const fin = debut + taillePage;
        return episodes.slice(debut, fin);
    };

    const tableauPages = () => {
        let p = [];
        for (let i = 1; i <= nbPages(); i++) {
            p.push(i);
        }
        return p;
    };

    const handleEpisodeClick = (episodeId) => {
        navigate(`/episode/${episodeId}`);
    };

    const isWatched = (episodeId) => {
        return history.some(episode => episode.episodeId === episodeId);
    };

    return (
        <div className="section" role="main">
            {episodes.length > 0 ? (
                <div className="container">
                    <h1 className="title has-text-centered">{tvshowTitle}</h1>
                    <h2 className="subtitle has-text-centered">{seasonNumber}</h2>
                    <div className="columns is-multiline">
                        {Paginer().map((episode) => (
                            <div key={episode.episodeId} className="column is-3-desktop is-4-tablet is-6-mobile">
                                <div
                                    onClick={() => handleEpisodeClick(episode.episodeId)}
                                    className={isWatched(episode.episodeId) ? 'watched-episode' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Episode episode={episode} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                        <button
                            className="pagination-previous"
                            onClick={() => {
                                if (pageCourante > 1) {
                                    setPageCourante(pageCourante - 1);
                                }
                            }}
                            disabled={pageCourante === 1}
                            aria-disabled={pageCourante === 1}
                        >
                            Précédent
                        </button>
                        <button
                            className="pagination-next"
                            onClick={() => {
                                if (pageCourante < nbPages()) {
                                    setPageCourante(pageCourante + 1);
                                }
                            }}
                            disabled={pageCourante >= nbPages()}
                            aria-disabled={pageCourante >= nbPages()}
                        >
                            Suivant
                        </button>
                        <ul className="pagination-list">
                            {tableauPages().map((numPage) => (
                                <li key={numPage}>
                                    <button
                                        className={`pagination-link ${numPage === pageCourante ? 'is-current' : ''}`}
                                        aria-label={`Page ${numPage}`}
                                        aria-current={numPage === pageCourante ? 'page' : undefined}
                                        onClick={() => setPageCourante(numPage)}
                                    >
                                        {numPage}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            ) : (
                <div className="content has-text-centered" role="status">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default SeasonPage;
