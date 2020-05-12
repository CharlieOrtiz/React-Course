import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums, albumsPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {albums.map(album => (
      //Use Link to add the URL an id equal to the id of an album the user has made click
      <NavLink 
        to={`${albumsPathname}/${album.id}`} //When this is matched with the browser path, NavLink adds an active class to the className
        className='item'
        key={album.id}  
      >
        {album.name}
      </NavLink>
    ))}
  </div>
);

export default VerticalMenu;
