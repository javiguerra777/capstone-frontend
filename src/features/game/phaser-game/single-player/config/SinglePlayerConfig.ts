import Phaser from 'phaser';
import Home from '../scenes/Home';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: '100%',
    height: '100%',
  },
  backgroundColor: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  parent: 'single-mode',
  scene: [Home],
};

export default config;
