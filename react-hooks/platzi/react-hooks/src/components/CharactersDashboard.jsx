import React, {useState, useEffect} from 'react';
import Character from './Character';

export default function CharactersDashboard({charactersUrl}) {
    const [charactersIds, setCharactersIds] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [charactersShowed, setCharactersShowed] = useState(3);

    const onClickShowCharacters = () => {
        setCharactersShowed(charactersShowed === 3 ? characters.length : 3);
    }

    useEffect(() => {
        const ids = charactersUrl.map((url) => {
            const arrayUrl = url.split('/');
            const id = arrayUrl[arrayUrl.length - 1];
            return id;

        })
        setCharactersIds(ids);
    }, [charactersUrl]);

    useEffect(() => {
        if(!charactersIds.length) return;
        fetch(`https://rickandmortyapi.com/api/character/${charactersIds}`)
            .then((response) => response.json())
            .then((data) => setCharacters(data))
    }, [charactersIds])

    return (
        <div className='characters-dashboard'>
            <h3>The cast</h3>
            <div className='characters-container'>
            {
                characters.map((character, index) => (
                    index < charactersShowed ? (    
                        <Character 
                            character={character}
                            key={character.id}
                        />
                    ) : (
                        <Character 
                            character={character}
                            key={character.id}
                            hideCharacter={true}
                        />
                    )
                ))
            }
            </div>
            <button type='button' onClick={onClickShowCharacters}>{charactersShowed === 3 ? 'Show more' : 'Show less'}</button>
        </div>
    )
}
