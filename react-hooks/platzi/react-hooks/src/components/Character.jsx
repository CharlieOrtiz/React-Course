import React, { useContext } from 'react';
import { FavoriteDispatch } from '../context/index';

export default function Character({character, hideCharacter}) {
    const dispatch = useContext(FavoriteDispatch);

    return (
        <div className={`character-card ${hideCharacter ? 'hide-character' : ''}`}>
            <img src={character.image} alt={character.name} />
            <div>
                <p><strong>{character.name}</strong></p>
                <p><strong>Status: </strong>{character.status}</p>
                <p><strong>Specie: </strong>{character.species}</p>
            </div>
            <div style={{display: 'flex', flexDirection:'column'}}>
                <button onClick={() => dispatch({type: 'ADD_CHARACTER', character})}>+ Favorites</button>
                <button onClick={() => dispatch({type: 'REMOVE_CHARACTER', id: character.id})}>- Remove</button>
            </div>
        </div>
    )
}
