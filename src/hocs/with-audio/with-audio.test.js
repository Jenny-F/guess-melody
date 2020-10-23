import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withAudio from "./with-audio.js";

const mockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

mockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const MockComponentWrapped = withAudio(mockComponent);

it(`Should WithAudio render correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped
        isPlaying={false}
        src={``}
        onPlayButtonClick={() => {}}
      />, {
        createNodeMock() {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
