import React from 'react'

export default function Character({character, hideCharacter}) {
    return (
        <div className={`character-card ${hideCharacter ? 'hide-character' : ''}`}>
            <img src={character.image} alt={character.name} />
            <div>
                <p><strong>{character.name}</strong></p>
                <p><strong>Status: </strong>{character.status}</p>
                <p><strong>Specie: </strong>{character.species}</p>
            </div>
        </div>
    )
}
