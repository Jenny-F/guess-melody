import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

it(`Should AudioPlayer component render correctly`, () => {
  const tree = renderer.create(
      <AudioPlayer
        isPlaying={false}
        isLoading={true}
        onPlayButtonClick={() => {}}
      >
        <audio/>
      </AudioPlayer>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
