import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

const mock = {
  song: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
};

it(`Should AudioPlayer component render correctly`, () => {
  const tree = renderer.create(
      <AudioPlayer
        src={mock.song}
        isPlaying={false}
        onPlayButtonClick={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
