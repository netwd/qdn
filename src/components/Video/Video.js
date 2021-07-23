import React from 'react';
import styles from './Video.module.scss';

const BASE_EMBED_URL = 'https://www.youtube.com/embed/';

export function Video(props) {
  if(!props.id) {
    return null;
  }
  const embedUrl = `${BASE_EMBED_URL}${props.id}`;
  return (
    <div className={styles['video-container']}>
      <div className={styles['video']}>
        <iframe className={styles['video-player']} src={embedUrl} frameBorder='0'
                allow='autoplay; encrypted-media' allowFullScreen title='video' />
      </div>

    </div>
  );
}