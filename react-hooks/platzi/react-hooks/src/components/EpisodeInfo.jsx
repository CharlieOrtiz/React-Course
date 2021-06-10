import React from 'react';
import CharactersDashboard from './CharactersDashboard';

export default function EpisodeInfo({episode}) {
    return (
        <div className='episode-info-container'>
            <div className='episode-title'>
                <h2>{episode.name}</h2>
            </div>
            <p>Episode: {episode.episode}</p>
            <div>
                <h3>Synopsis</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci cumque quibusdam consequatur quo suscipit doloremque cupiditate, dicta tempore neque debitis nemo voluptates molestiae itaque. Consequatur error pariatur rerum voluptate culpa sed voluptates ratione id accusantium sint optio soluta, et libero voluptatum eaque molestiae dolorum odio?</p>
            </div>
            <CharactersDashboard
                charactersUrl={episode.characters}
            />
        </div>
    )
}
