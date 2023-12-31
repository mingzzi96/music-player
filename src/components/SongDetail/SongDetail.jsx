import React from 'react';
import './SongDetail.scss';
import img1 from '../../images/music-1.jpg';
import { useSelector } from 'react-redux';
function SongDetail() {

  const playing = useSelector((state) => state.playing);
  return (
    <>
      <div className="header">
        <span>{playing ? 'Now Playing' : 'Not Playing'}</span>
      </div>
      <div className="img-area">
        <img
          src={img1}
          alt=""
        />
      </div>
      <div className="music-info">
        <p className="song">음악제목</p>
        <p className="artist">아티스트</p>
      </div>
    </>
  );
}

export default SongDetail;
