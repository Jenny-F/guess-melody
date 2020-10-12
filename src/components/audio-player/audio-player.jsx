import React from "react";
import PropTypes from "prop-types";

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const {src} = this.props;
    // const {isPlaying} = this.state;
    const audio = this._audioRef.current;

    audio.src = src;
    // if (isPlaying) {
    //   audio.play();
    // }

    audio.oncanplaythrought = () => {
      this.setState({
        isLoading: false,
      });
    };

    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    audio.onpause = () => {
      this.setState({
        isPlaying: false,
      });
    };

    audio.ontimeupdate = () => {
      this.setState({
        progress: audio.currentTime,
      });
    };
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrought = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  render() {
    const {isPlaying, isLoading} = this.state;
    const {onPlayButtonClick} = this.props;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={!isLoading}
          onClick={() => {
            this.setState((prevState) => ({
              isPlaying: !prevState.isPlaying,
            }));
            onPlayButtonClick();
          }}
        >
        </button>
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>
      </React.Fragment>
    );
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default AudioPlayer;
