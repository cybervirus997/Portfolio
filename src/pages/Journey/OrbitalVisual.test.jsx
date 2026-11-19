import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import OrbitalVisual from './OrbitalVisual';
import { createOrbitalScene } from './orbitalEngine';
jest.mock('./orbitalEngine', () => ({createOrbitalScene: jest.fn()}));
let container, controller, originalWebGL;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  originalWebGL = window.WebGLRenderingContext;
  window.WebGLRenderingContext = function () {};
  controller = {dispose: jest.fn(), setMode: jest.fn()};
  createOrbitalScene.mockReset();
  createOrbitalScene.mockReturnValue(controller);
});
afterEach(() => {
  act(() => {ReactDOM.unmountComponentAtNode(container);});
  container.remove();
  window.WebGLRenderingContext = originalWebGL;
});
async function render(paused = false, mode = 'orbit') {
  await act(async () => {ReactDOM.render(<OrbitalVisual paused={paused} mode={mode}/>, container);});
}
test('does not initialize WebGL when motion is paused', async () => {
  await render(true);
  expect(createOrbitalScene).not.toHaveBeenCalled();
  expect(container.querySelector('.j-orb-fallback')).not.toBeNull();
});
test('initializes on demand, changes mode and releases GPU resources on pause', async () => {
  await render();
  expect(createOrbitalScene).toHaveBeenCalledTimes(1);
  expect(container.querySelector('.webgl-ready')).not.toBeNull();
  await render(false, 'signal');
  expect(controller.setMode).toHaveBeenCalledWith('signal');
  await render(true);
  expect(controller.dispose).toHaveBeenCalledTimes(1);
  expect(container.querySelector('.webgl-ready')).toBeNull();
});
test('context loss restores the CSS fallback and releases the scene', async () => {
  await render();
  act(() => {createOrbitalScene.mock.calls[0][1].onFailure();});
  expect(controller.dispose).toHaveBeenCalledTimes(1);
  expect(container.querySelector('.webgl-ready')).toBeNull();
});
test('renderer initialization failure leaves content and CSS sphere usable', async () => {
  createOrbitalScene.mockImplementation(() => {throw new Error('WebGL unavailable');});
  await render();
  expect(container.querySelector('.webgl-ready')).toBeNull();
  expect(container.querySelectorAll('.j-ring')).toHaveLength(16);
});
