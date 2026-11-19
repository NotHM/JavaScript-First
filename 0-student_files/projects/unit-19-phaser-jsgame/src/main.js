/**
 * Unit 19 Project Starter: Phaser 3 Handheld Arcade Scene
 */
import Phaser from 'phaser';
import { getInput } from './utils.js';

export class ArcadeQuestScene extends Phaser.Scene {
  constructor() {
    super('ArcadeQuestScene');
  }

  preload() {
    // TODO [L6 Create]: Generate or load player, collectible, hazard & SFX assets
  }

  create() {
    // TODO [L6 Create]: Build 640x480 arena, Arcade Physics colliders, particle trail & HUD text
  }

  update(_time, _delta) {
    // TODO [L6 Create]: Poll [p1] = getInput() for movement, action button & START pause toggle
    void getInput;
  }
}

export const CONFIG = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: 'game-root',
  scene: ArcadeQuestScene,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 200 } },
  },
};
