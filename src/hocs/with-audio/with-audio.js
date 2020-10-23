import React from "react";
import PropTypes from "prop-types";

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent {
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
          progress: Math.floor(audio.currentTime),
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

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    render() {
      const {isPlaying, isLoading} = this.state;
      const {onPlayButtonClick} = this.props;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          isLoading={isLoading}
          onPlayButtonClick={() => {
            this.setState((prevState) => ({
              isPlaying: !prevState.isPlaying,
            }));
            onPlayButtonClick();
          }}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
      );
    }
  }

  WithAudio.propTypes = {
    src: PropTypes.string.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };

  return WithAudio;
};

export default withAudio;
