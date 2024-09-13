import React from 'react';

const Artist = ({ role }) => {
    return (
        <div className="card" role="region" aria-labelledby={`role-title-${role.roleId}`}>
            <div className="card-image">
                <figure className="image">
                    <img src={role.imgURL} alt={`${role.name}`} />
                </figure>
            </div>
            <div className="card-content">
                <p id={`role-title-${role.roleId}`}><strong>{role.character}</strong></p>
                <p>{role.name}</p>
            </div>
        </div>
    );
};

export default Artist;
