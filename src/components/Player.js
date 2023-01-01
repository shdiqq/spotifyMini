import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accesToken, trackUri }) {

  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri])

  if (!accesToken) {
    return null
  };

  return (
   <SpotifyPlayer 
    token={accesToken} 
    showSaveIcon
    callback={state => {
      if (!state.isPlaying) {
        setPlay(false);
      }
    }}
    play={play}
    uris={trackUri? [trackUri] : []}
    />
  )
}
