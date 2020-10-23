import React from "react";
import Player from "../../components/audio-player/audio-player.jsx";
import withAudio from "../with-audio/with-audio.js";

const AudioPlayer = withAudio(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: -1,
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(src, id) => {
          return <AudioPlayer
            src={src}
            isPlaying={id === activePlayerId}
            onPlayButtonClick={() => (this.setState({
              activePlayerId: id === activePlayerId ? -1 : id,
            }))}
          />;
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
