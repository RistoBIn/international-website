import React, { useState } from 'react';
import ReactPlayer from 'react-player';
// import { ReactComponent as LivestreamIcon } from '../../../images/sealabIcons/livestream_play.svg';

const Livestream = () => {
  const [playerKey, setPlayerKey] = useState(null);
  const siteUID = process.env.GATSBY_UID;

  function buildStreamUri(user, passwd, host, port, app, stream) {
    return `https://${user}:${passwd}@${host}:${port}/${app}/${stream}.stream/playlist.m3u8`;
  }

  return (
    <ReactPlayer
      key={playerKey}
      className="react-player"
      url={buildStreamUri(
        'sealab',
        'teamgaeff',
        'cdn.sealab.no',
        '1936',
        'bluethink-go',
        siteUID,
      )}
      playing
      muted
      controls
      width="100%"
      height="100%"
      // playIcon={<LivestreamIcon />}
      onError={(err, errorDetails) => {
        try {
          if (errorDetails.fatal) setPlayerKey(playerKey + 1);
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};

export default Livestream;
