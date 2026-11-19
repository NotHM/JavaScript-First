/**
 * Lesson 19.2 Instructor Reference: Phaser 3 Scene + jsgamelauncher Input
 * Grounded in monteslu/jsgames/simple-phaser (src/main.js).
 */
import Phaser from 'phaser';
import { getInput } from './utils.js';

export class StarRunnerScene extends Phaser.Scene {
  constructor() {
    super('StarRunnerScene');
    this.canPlaySound = true;
  }

  preload() {
    // Generate runtime textures so the starter runs cleanly even without external PNGs
    const gfx = this.make.graphics({ x: 0, y: 0, add: false });
    gfx.fillStyle(0x38bdf8, 1);
    gfx.fillCircle(20, 20, 20);
    gfx.generateTexture('orb', 40, 40);

    gfx.clear();
    gfx.fillStyle(0xfacc15, 1);
    gfx.fillRect(0, 0, 8, 8);
    gfx.generateTexture('spark', 8, 8);

    gfx.clear();
    gfx.fillStyle(0x22c55e, 1);
    gfx.fillRect(0, 0, 96, 16);
    gfx.generateTexture('paddle', 96, 16);
    gfx.destroy();
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f172a');

    const particles = this.add.particles(0, 0, 'spark', {
      speed: 90,
      scale: { start: 1, end: 0 },
      lifespan: 450,
      blendMode: 'ADD',
    });

    this.orb = this.physics.add.image(320, 120, 'orb');
    this.orb.setVelocity(180, -210);
    this.orb.setBounce(1, 1);
    this.orb.setCollideWorldBounds(true);

    particles.startFollow(this.orb);

    this.paddle = this.physics.add.image(320, 430, 'paddle');
    this.paddle.setImmovable(true);
    this.paddle.body.setAllowGravity(false);
    this.paddle.setCollideWorldBounds(true);

    this.physics.add.collider(this.orb, this.paddle);

    this.score = 0;
    this.hudText = this.add.text(16, 16, 'PHASER + JSGAMELAUNCHER | BOUNCES: 0', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#f8fafc',
    });

    this.orb.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', () => {
      this.score += 1;
      this.hudText.setText(`PHASER + JSGAMELAUNCHER | BOUNCES: ${this.score}`);
    });
  }

  update(_time, _delta) {
    const [p1] = getInput();
    const speed = 340;

    if (p1.DPAD_LEFT.pressed) {
      this.paddle.setVelocityX(-speed);
    } else if (p1.DPAD_RIGHT.pressed) {
      this.paddle.setVelocityX(speed);
    } else {
      this.paddle.setVelocityX(0);
    }

    if (p1.BUTTON_SOUTH.pressed && this.canPlaySound) {
      this.orb.setVelocityY(-300);
      this.canPlaySound = false;
    } else if (!p1.BUTTON_SOUTH.pressed) {
      this.canPlaySound = true;
    }
  }
}

export const PHASER_CONFIG = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: 'game-root',
  scene: StarRunnerScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
};

const game = typeof window !== 'undefined' ? new Phaser.Game(PHASER_CONFIG) : null;
export default game;
