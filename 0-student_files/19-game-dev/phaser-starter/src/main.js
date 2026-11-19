/**
 * Student Lesson 19.2 Starter: Phaser 3 Scene & jsgamelauncher Packaging
 */
import Phaser from 'phaser';

export class StudentArcadeScene extends Phaser.Scene {
  constructor() {
    super('StudentArcadeScene');
  }

  preload() {
    // TODO [L3 Apply]: Load sprite/audio assets or generate Graphics textures
  }

  create() {
    // TODO [L3 Apply]: Add physics sprite with setVelocity, setBounce(1, 1),
    // setCollideWorldBounds(true), and particle emitter following sprite
  }

  update(_time, _delta) {
    // TODO [L3 Apply]: Poll Gamepad/Keyboard getInput() and control player paddle
  }
}

export const GAME_CONFIG = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: StudentArcadeScene,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 200 } },
  },
};
