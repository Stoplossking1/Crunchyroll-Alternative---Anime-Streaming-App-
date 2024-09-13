import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; 
import { svrURL } from "./constants";
function Home() {
    const [tvShows, setTvShows] = useState([]);
    const [filter, setFilter] = useState("");
    const [studios, setStudios] = useState([]);
    const [selectedStudio, setSelectedStudio] = useState("");
    const [taillePage, setTaillePage] = useState(() => {
        return parseInt(localStorage.getItem("taillePage")) || 8;
    });
    const [pageCourante, setPageCourante] = useState(1);

    const navigate = useNavigate();

    const handleShowClick = (tvshowId) => {
        navigate(`/details/${tvshowId}`);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const tvShowsResponse = await fetch(`${svrURL}/tvshows`);
                const studiosResponse = await fetch (`${svrURL}/studios`);
                if (!tvShowsResponse.ok || !studiosResponse.ok) throw new Error("Network response was not ok");

                const tvShowsData = await tvShowsResponse.json();
                const studiosData = await studiosResponse.json();

                setTvShows(tvShowsData);
                setStudios(studiosData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchData();
    }, []);

    function filteredTvShows() {
        let tvs = tvShows;
        if (filter !== "") {
            tvs = tvs.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase()));
        }
        if (selectedStudio !== "") {
            tvs = tvs.filter((t) => t.studio.name.toLowerCase() === selectedStudio.toLowerCase());
        }
        return tvs;
    }

    function nbPages() {
        return Math.ceil(filteredTvShows().length / taillePage);
    }

    function Paginer() {
        const debut = (pageCourante - 1) * taillePage;
        const fin = debut + taillePage;
        return filteredTvShows().slice(debut, fin);
    }

    function tableauPages() {
        let p = [];
        for (let i = 1; i <= nbPages(); i++) {
            p.push(i);
        }
        return p;
    }

    function handleTaillePageChange(event) {
        const newSize = parseInt(event.target.value);
        setTaillePage(newSize);
        localStorage.setItem("taillePage", newSize);
        setPageCourante(1);
    }

    return (
        <div className="container">
            <h1 className="title has-text-centered">TP2</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by title..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    aria-label="Filter by title"
                    className="filter-title"
                />
                <div className="filter-studio">
                    <select value={selectedStudio} onChange={(e) => setSelectedStudio(e.target.value)} aria-label="Select a Studio">
                        <option value="">Select a Studio</option>
                        {studios.map((studio) => (
                            <option key={studio.id} value={studio.name}>
                                {studio.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="columns is-multiline is-mobile" role="list">
                {Paginer().map((show) => (
                    <div key={show.tvshowId} className="column is-3-desktop is-4-tablet is-6-mobile" role="listitem">
                        <div className="card large" onClick={() => handleShowClick(show.tvshowId)} role="button" tabIndex="0" aria-pressed="false">
                            <div className="card-image">
                                <figure className="image is-square">
                                    <img src={show.imgURL} alt={show.title} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4 no-padding">{show.title}</p>
                                        <p className="subtitle is-6">{show.studio.name}</p>
                                        <p className="subtitle is-6">{show.genres.map(genre => genre.name).join(", ")}</p>
                                    </div>
                                </div>
                            </div>
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
                                className={`pagination-link ${numPage === pageCourante ? "is-current" : ""}`}
                                aria-label={`Page ${numPage}`}
                                aria-current={numPage === pageCourante ? "page" : undefined}
                                onClick={() => setPageCourante(numPage)}
                            >
                                {numPage}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="select">
                    <select value={taillePage} onChange={handleTaillePageChange} aria-label="Select number of items per page">
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                    </select>
                </div>
            </nav>
        </div>
    );
}

export default Home;
