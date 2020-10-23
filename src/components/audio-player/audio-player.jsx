import React from "react";
import PropTypes from "prop-types";

class AudioPlayer extends React.PureComponent {
  render() {
    const {isPlaying, isLoading, onPlayButtonClick, children} = this.props;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={!isLoading}
          onClick={() => onPlayButtonClick()}
        >
        </button>
        <div className="track__status">
          {children}
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default AudioPlayer;
