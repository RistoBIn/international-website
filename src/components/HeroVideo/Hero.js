import React from 'react';
import classNames from 'classnames';
import YouTube from 'react-youtube';
import styles from './Hero.module.scss';
import Button from '../Button';

const Hero = ({
  Navbar,
  callToActionLink,
  callToActionText,
  secondaryCallToActionLink,
  secondaryCallToActionText,
  title,
  subtitle,
  // backgroundVideoMP4,
  // backgroundVideoWebM,
}) => {
  const videoOptions = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      enablejsapi: 1,
      loop: 1,
    },
  };

  const onReady = event => {
    event.target.playVideo();
    event.target.mute();
  };
  const onEnd = event => {
    event.target.playVideo();
  };
  return (
    <section
      className={classNames('hero', 'is-fullheight', styles.videoSection)}
    >
      <div
        className={classNames('hero-video', styles.video, 'is-hidden-mobile')}
      >
        <div className={classNames(styles.videoForeground)}>
          <YouTube
            videoId="aQXJZfxR6kY"
            opts={videoOptions}
            className="video-iframe"
            onReady={onReady}
            onEnd={onEnd}
          />
        </div>
      </div>

      <div className="hero-head">
        <Navbar className="is-transparent" />
      </div>
      <div className={classNames('hero-body', styles.content)}>
        <div className="container has-text-left">
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
          <div className={styles.groupedButtons}>
            <Button
              link={callToActionLink}
              className="is-primary large"
              text={callToActionText}
            />
            <Button
              link={secondaryCallToActionLink}
              className="is-link large"
              text={secondaryCallToActionText}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
