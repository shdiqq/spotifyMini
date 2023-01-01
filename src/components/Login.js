import React from 'react'
import { Container } from 'react-bootstrap';

export default function Login() {
  const handleClick = () => {
    const redirectUrl = "https://shdiqq.github.io/spotifyMini/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const clientId= "e45e6d786f894e59b9225042d0fa793b";  
    const scope = [
      "streaming",
      "%20user-library-read",
      "%20user-library-modify",
      "%20user-read-private",
      "%20user-read-email",
      "%20user-modify-playback-state",
      "%20user-read-playback-state",
    ];
    window.location.href=  `${apiUrl}?client_id=${clientId}&response_type=token&show_dialog=true&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}`
  }
  return (
    <Container className='d-flex flex-column justify-content-center align-items-center' style={{minHeight: '100vh'}}>
      <img className='m-2' src='/spotify-logo.png' alt='spotify-logo' style={{ height: '250px', width: '250px'}} />
      <button className='btn btn-success btn-lg m-2' onClick={handleClick}>Connect Spotify</button>
      <span className='text-center m-2 fw-light fs-6'>Made by Shadiq Harwiz </span>
      <span className='text-center fw-light fs-6'>Caution: You need Spotify Premium to use it!</span>
    </Container>
  )
}
