import React from 'react'
import styled from 'styled-components';

export default function TrackSearchResult({ track, chooseTrack }) {

  function handlePlay() {
     chooseTrack(track)
  }

  return (
    <TrackSearchResultShow className='d-flex m-2 align-items-center' style={{cursor: 'pointer'}} onClick={handlePlay}>
      <img src={track.albumUrl} style={{ height: '64px', width: '64px'}} alt='ImageAlbum'/>
      <div className='ml-3'>
        <div>{track.title}</div>
        <div className='text-muted'>{track.artist}</div>
      </div>
    </TrackSearchResultShow>
  )
}

const TrackSearchResultShow = styled.div`
  :hover {
    opacity: 0.5;
    background-color: rgb(221, 221, 221);
  }
`;