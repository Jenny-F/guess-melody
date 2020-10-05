import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  song: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
};

it(`Click on button in AudioPlayer calls callback`, () => {
  const handlePlayButtonClick = jest.fn();
  const audio = mount(<AudioPlayer
    src={mock.song}
    isPlaying={true}
    onPlayButtonClick={handlePlayButtonClick}
  />);

  const playButton = audio.find(`.track__button`);
  playButton.simulate(`click`);

  expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);

  playButton.simulate(`click`);

  expect(handlePlayButtonClick).toHaveBeenCalledTimes(2);
});
