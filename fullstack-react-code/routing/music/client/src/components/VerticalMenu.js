import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {albums.map(album => (
      //Use Link to add the URL an id equal to the id of an album the user've made click
      <Link 
        to={`/albums/${album.id}`}
        className='item'
        key={album.id}  
      >
        {album.name}
      </Link>
    ))}
  </div>
);

export default VerticalMenu;
