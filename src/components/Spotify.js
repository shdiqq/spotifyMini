import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebAPI from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';
import {useStateProvider} from '../utils/StateProvider';
import {reducerCases} from '../utils/Constant';
import { CgProfile } from 'react-icons/cg';

const spotifyWebAPI = new SpotifyWebAPI({
  clientId: 'e45e6d786f894e59b9225042d0fa793b',
});

export default function Spotify() {
  
  const [{accessToken}, dispatch] = useStateProvider();
  const [{ userInfo }] = useStateProvider();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
  }

  useEffect(() => {
    if (!accessToken) {
      return
    }
    spotifyWebAPI.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return
    }

    if (!search) {
      return setSearchResult([]);
    }

    let cancel = false;
    spotifyWebAPI.searchTracks(search).then(res => {
      if (cancel) {
        return;
      }
      setSearchResult(res.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) {
            return image;
          } else {
            return smallest;
          }
        }, track.album.images[0])
        
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
        }
      }))
    })
    
    return () => cancel = true;
  }, [search, accessToken])

  useEffect(() => {
    const getUserInfo = async() => {
      const {data} = await axios.get('https://api.spotify.com/v1/me',{
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
      window.history.pushState({}, null, '/');
    };
    getUserInfo();
  }, [dispatch, accessToken]);

  return (
    <Container className='d-flex flex-column py-2' style={{height: '100vh'}}>
      <div>
        <div className="d-flex justify-content-end p-3">
          <UserProfile>
            <a href={userInfo?.userUrl}>
              <CgProfile />
              <span>{userInfo?.name}</span>
            </a>
          </UserProfile>
        </div>
      </div>
      <Form.Control 
        type='search' 
        placeholder='search songs/artist'
        value={search} 
        onChange={e => setSearch(e.target.value)}
      />
      <div className='flex-grow-1 my-2' style={ {overflowY: 'auto'}}>
      {searchResult.map(track => (
        <TrackSearchResult 
          track={track} 
          key={track.uri}
          chooseTrack={chooseTrack}
        />
      ))}
    </div>
    <div>
      <Player 
        accesToken={accessToken} 
        trackUri={playingTrack?.uri}
      />
      </div>
    </Container>
  )
}

const UserProfile = styled.div`

  background-color: black;
  padding: 0.3rem 0.4rem;
  padding-right: 1rem;
  border-radius: 2rem;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: white;
    font-weight: bold;
    svg {
      font-size: 1.3rem;
      background-color: #282828;
      padding: 0.2rem;
      border-radius: 1rem;
      color: #c7c5c5;
    }
  }
`;