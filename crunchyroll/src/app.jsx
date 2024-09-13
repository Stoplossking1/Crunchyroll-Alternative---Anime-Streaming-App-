import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Details from './details';
import Menu from './Menu';
import AuthContext, { AuthProvider } from './AuthContext';
import Login from './Login';
import SeasonPage from './SeasonPage';
import History from './History';
import JouerEpisode from './JouerEpisode';


function App() {
    return (
        <AuthProvider>
            <Router>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/details/:tvshowId" element={<Details />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/season/:seasonId" element={<SeasonPage />} />
                    <Route path="/episode/:episodeId" element={<JouerEpisode />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;