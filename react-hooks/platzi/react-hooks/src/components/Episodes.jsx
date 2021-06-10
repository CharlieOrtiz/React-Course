import React, { useState, useEffect } from 'react';
import EpisodeInfo from './EpisodeInfo';

export default function Episodes() {
    const [episodeList, setEpisodeList] = useState([]);
    const [episode, setEpisode] = useState(undefined);

    const onChangeSelect = (e) => {
        const selectedEpisode = episodeList.find((episode) => (
            episode.name === e.target.value
        ));
        setEpisode(selectedEpisode);
    }

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/episode')
             .then((response) => response.json())
             .then((data) => setEpisodeList(data.results))
             .catch((error) => console.error(error))
    }, []);

    return (
        <div className='main-container'>
            <form>
                <h2>Choose an episode</h2>
                <div>
                    <select value={episode ? episode.name : ''} onChange={onChangeSelect}>
                        <option value=''>
                            ---
                        </option>
                        {
                           episodeList.map((episode) => (
                            <option value={episode.name} key={episode.id} id={episode.id}>
                                {episode.name}
                            </option>
                           )) 
                        }
                    </select>
                </div>
            </form>
            {
                episode && <EpisodeInfo episode={episode}/>
            }
        </div>
    )
}
