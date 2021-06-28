import React, {useState, useEffect, useReducer, useMemo} from 'react';
import Character from './Character';
import { FavoriteDispatch } from '../context/index';

const initialState = [];

function favoritesReducer(state, action) {
    switch(action.type) {
        case 'ADD_CHARACTER': {
            const {id, name, image} = action.character;
            let newCharacter = state.find((character) => (
                character.id === id
            ));

            if(newCharacter) return state;

            newCharacter = {
                id,
                name,
                image,
            }
            return [...state, newCharacter];
        }
        case 'REMOVE_CHARACTER': {
            const newState = state.filter((character) => (
                character.id !== action.id
            ));

            return newState;
        }
        default:{
            return state;
        }
    }
}

export default function CharactersDashboard({charactersUrl}) {
    const [charactersIds, setCharactersIds] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [charactersShowed, setCharactersShowed] = useState(4);
    const [searchValue, setSearchValue] = useState('')
    const [favorites, dispatch] = useReducer(favoritesReducer, initialState);


    const onClickShowCharacters = () => {
        setCharactersShowed(charactersShowed === 4 ? characters.length : 4);
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value);
    }

    /*const filterCharacters = characters.filter((character) => (
        character.name.toLowerCase().includes(searchValue.toLowerCase())
    ));*/

    const filterCharacters = useMemo(() => {
        console.log('hi')
        return characters.filter((character) => (
            character.name.toLowerCase().includes(searchValue.toLowerCase())
        ))
    }, [characters, searchValue]);
    //console.log(filterCharacters);

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
    }, [charactersIds]);

    return (
        <div className='characters-dashboard'>
            <div className='cast-container'>
                <h3>The cast</h3>
                <div className='characters-container'>
                    <div style={{width:'100%', textAlign:'center'}}>
                        <h4 style={{margin:'-10px 0 5px 0'}}>Search</h4>
                        <input type="text" value={searchValue} onChange={onChangeSearchInput} />
                    </div>
                    <FavoriteDispatch.Provider value={dispatch}>
                    {
                        filterCharacters.map((character, index) => (
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
                    </FavoriteDispatch.Provider>
                </div>
            </div>
            <div className='favorites-container'>
                <h3>Favorites</h3>
                <div>
                    {
                        favorites.map((character) => (
                            <div className='character-card' key={character.id}>
                                <img src={character.image} alt={character.name} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <button type='button' onClick={onClickShowCharacters}>{charactersShowed === 4 ? 'Show more' : 'Show less'}</button>
        </div>
    )
}
