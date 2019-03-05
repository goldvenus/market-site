import anime from 'animejs';
import {
  createOpacityAnimationConfig,
  triggerAnimationDoneEvent,
  ANIMAITON_DURATION_1, ANIMAITON_DURATION_2,
} from '../../utils/animation';

export const animateMenuIn = menuContainer =>
  anime
    .timeline()
    .add({
      targets: menuContainer.querySelectorAll('.animated-bg'),
      translateX: [-1000, 0],
      translateY: [-1000, 0],
      opacity: createOpacityAnimationConfig(true, ANIMAITON_DURATION_1),
      duration: ANIMAITON_DURATION_1,
      easing: 'linear',
    })
    .add({
      targets: menuContainer.querySelectorAll('.animated-menu-item'),
      translateY: [30, 0],
      opacity: createOpacityAnimationConfig(true, ANIMAITON_DURATION_2 + 20),
      duration: ANIMAITON_DURATION_2 + 20,
      easing: 'linear',
      delay: anime.stagger(ANIMAITON_DURATION_2),
      complete: () => triggerAnimationDoneEvent(menuContainer),
    }, '-=20');

export const animateMenuOut = menuContainer =>
  anime
    .timeline()
    .add({
      targets: menuContainer.querySelectorAll('.animated-menu-item'),
      translateY: 30,
      opacity: createOpacityAnimationConfig(false, ANIMAITON_DURATION_2 + 20),
      duration: ANIMAITON_DURATION_2 + 20,
      easing: 'linear',
      delay: anime.stagger(ANIMAITON_DURATION_2),
    })
    .add({
      targets: menuContainer.querySelectorAll('.animated-bg'),
      translateX: -1000,
      translateY: -1000,
      opacity: createOpacityAnimationConfig(false),
      duration: ANIMAITON_DURATION_1,
      easing: 'linear',
      complete: () => triggerAnimationDoneEvent(menuContainer),
    }, '-=20');

export const animateMenuItemIn = menuItem =>
  anime({
    targets: menuItem,
    translateY: [30, 0],
    opacity: createOpacityAnimationConfig(true, ANIMAITON_DURATION_2 + 20),
    duration: ANIMAITON_DURATION_2 + 20,
    easing: 'linear',
    complete: () => triggerAnimationDoneEvent(menuItem),
  });

export const animateMenuItemOut = menuItem =>
  anime({
    targets: menuItem,
    translateY: 30,
    opacity: createOpacityAnimationConfig(false, ANIMAITON_DURATION_2 + 20),
    duration: ANIMAITON_DURATION_2 + 20,
    easing: 'linear',
    complete: () => triggerAnimationDoneEvent(menuItem),
  });
