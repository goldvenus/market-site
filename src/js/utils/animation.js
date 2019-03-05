export const ANIMAITON_DURATION_1 = 100;
export const ANIMAITON_DURATION_2 = 80;
export const ANIMATION_DONE_EVENT = 'animation::done';

export const triggerAnimationDoneEvent = node =>
  node.dispatchEvent(new Event(ANIMATION_DONE_EVENT));

export const addEndListener = (node, done) =>
  node.addEventListener(ANIMATION_DONE_EVENT, done);

export const createOpacityAnimationConfig = (animatingIn, duration) => ({
  value: animatingIn ? [0, 1] : 0,
  easing: 'linear',
  duration: duration || ANIMAITON_DURATION_2,
});
