import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Album from './Album';
import { client } from '../Client';
import VerticalMenu from './VerticalMenu';

const ALBUM_IDS = [
  '23O4F21GDWiGd33tFN3ZgI',
  '3AQgdwMNCiN7awXch5fAaG',
  '1kmyirVya5fRxdjsPFDM05',
  '6ymZBbRSmzAvoSGmwAFoxm',
  '4Mw9Gcu1LT7JaipXdwrq1Q',
];

class AlbumsContainer extends Component {
  state = {
    fetched: false,
    albums: [],
  };

  componentDidMount() {
    this.getAlbums();
  }

  getAlbums = () => {
    client.getAlbums(ALBUM_IDS)
      .then((albums) => (
        this.setState({
          fetched: true,
          albums: albums,
        })
       ));
  };

  render() {
    if (!this.state.fetched) {
      return (
        <div className='ui active centered inline loader' />
      );
    } else {
      const matchPath = this.props.match.path; //Variable equal to the path used by Route to match (/albums)
      return (
        <div className='ui two column divided grid'>
          <div
            className='ui six wide column'
            style={{ maxWidth: 250 }}
          >
            { //We're displaying VerticalMenu with information about every album, that's the reason we pass the name and id of every album as an array object
              <VerticalMenu 
                albums={this.state.albums.map(album => {
                return {
                  name: album.name, 
                  id: album.id
                }
              })} 
                albumsPathname={matchPath}
              />
            }
          </div>
          <div className='ui ten wide column'>
            { //The route path specifies a param as albumId, this path is going to be match with any similar URL structure
              <Route path={`${matchPath}/:albumId`} render={({match}) => {
                //What is going to be strict is the Album component, wich one we pass the album variable containing the album object that match with the albumId param from the URL
                const album = this.state.albums.find(
                  (a) =>  a.id === match.params.albumId 
                )

                return ( 
                  <Album 
                    album={album}
                    albumsPathname={matchPath} //albumsPathname is used in Album to go back to the /albums pathname when the user makes click in the close button
                  />
                );
              }} />
            }
          </div>
        </div>
      );
    }
  }
}

export default AlbumsContainer;
