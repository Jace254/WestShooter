class Sprite {
  constructor({
    position,
    image,
    frames = {
      max: 1,
      current: 0,
    },
    layers = {
      max: 1,
      current: 0,
    },
  }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.layers = layers;
    this.image.onload = () => {
      this.width = this.image.width / frames.max;
      this.height = this.image.height / layers.max;
      this.center = {
        x: this.position.x - this.width / 2,
        y: this.position.y - this.height / 2,
      };
    };
    this.refilled = false
  }

  draw() {
    c.drawImage(
      this.image,
      this.frames.current * this.width,
      this.layers.current * this.height,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(
    inputHandler = null,
    player = null,
    deltaTime,
    UIGroup = null,
    left = false,
    enemy = null
  ) {
    inputHandler.handleInput(player);
    //actions animation
    if (
      !inputHandler.keys.up.pressed &&
      !inputHandler.keys.down.pressed &&
      !inputHandler.keys.left.pressed &&
      !inputHandler.keys.right.pressed &&
      !inputHandler.keys.shoot.pressed 
    ) {
      if(!player.alive){
        player.die()
      } else {
        player.idle();
        player.fire = false;
        player.shielded = false;
      }
    }
    if (!enemy.inputHandler.keys.shoot.pressed) {
      player.damage = false;
    }
    if (
      (inputHandler.keys.up.pressed == true && player.alive) ||
      (inputHandler.keys.down.pressed == true && player.alive)
    ) {
      player.moveUpDown(deltaTime);
    }
    if (
      (inputHandler.keys.left.pressed == true && player.alive) ||
      (inputHandler.keys.right.pressed == true && player.alive)
    ) {
      player.moveLeftRight(deltaTime);
    }
    if (
      inputHandler.keys.shoot.pressed &&
      player.playerStats.bullets > 0 &&
      player.alive
    ) {
      player.shoot(deltaTime);
      if (player.fire == false) {
        if (player.playerStats.bullets > 0) {
          player.playerStats.bullets -= 1;
          if (left) {
            UIGroup.bulletBar[player.playerStats.bullets].layers.current = 3;
          } else {
            UIGroup.bulletBar[player.playerStats.bullets].layers.current = 1;
          }
        }
        if (player.playerStats.bullets == 0 && player.playerStats.ammo > 0) {
          player.playerStats.bullets = 4;
          if (left) {
            UIGroup.bulletBar.map((b) => (b.layers.current = 2));
          } else {
            UIGroup.bulletBar.map((b) => (b.layers.current = 0));
          }
          player.playerStats.ammo -= 1;

          UIGroup.ammoBar[player.playerStats.ammo].layers.current = 2;
        }
        this.refilled = false;
        player.shielded = false;
        player.fire = true;
      }
    }
    if ((enemy.damage == true)) {
      setTimeout(() => {
        if (!this.refilled) {
          console.log(this.refilled)
          player.playerStats.bullets += 1;
          if (left) {
            UIGroup.bulletBar[player.playerStats.bullets - 1].layers.current = 2;
          } else {
            UIGroup.bulletBar[player.playerStats.bullets - 1].layers.current = 0;
          }
          this.refilled = true
        }
      }, 350)
    }

    if (
      inputHandler.keys.shield.pressed &&
      !inputHandler.keys.up.pressed &&
      !inputHandler.keys.down.pressed &&
      !inputHandler.keys.left.pressed &&
      !inputHandler.keys.right.pressed &&
      !inputHandler.keys.shoot.pressed &&
      player.alive
    ) {
      player.shield(deltaTime);
      player.shielded = true;
    }

    if (
      enemy.inputHandler.keys.shoot.pressed &&
      player.alive &&
      enemy.playerSprite.position.y === player.playerSprite.position.y &&
      !player.shielded &&
      enemy.playerStats.bullets > 0 &&
      enemy.alive
    ) {
      player.takeDamage(deltaTime, enemy.inputHandler.keys.shoot.pressed);
      if (player.damage === false) {
        if (player.playerStats.life > 0) {
          player.playerStats.life -= 1;
          UIGroup.lifeBar[player.playerStats.life].layers.current = 2;
        }
        if (player.playerStats.life == 0) {
          player.alive = false;
        }
        player.damage = true;
      }
    }
  }
}

class Target {
  constructor(sprite, player) {
    this.player = player;
    this.sprite = sprite;
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
  }

  checkTarget() {
    if (
      this.sprite.position.y + this.sprite.height / 8 <
      this.player.position.y + this.player.height / 2
    ) {
      this.up = true;
    }
    if (
      this.sprite.position.x + this.sprite.width / 2 >
      this.player.position.x + this.player.width / 2
    ) {
      this.right = true;
    }
    if (
      this.sprite.position.y + this.sprite.height / 8 >
      this.player.position.y + this.player.height / 2
    ) {
      this.down = true;
    }
    if (
      this.sprite.position.x + this.sprite.width / 2 <
      this.player.position.x + this.player.width / 2
    ) {
      this.left = true;
    }
  }

  resetTarget() {
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
  }
}

class InputHandler {
  constructor(playerSprite, targets, left) {
    this.player = playerSprite;
    this.targets = targets;
    this.left = left;
    this.keys = {
      up: {
        pressed: false,
        lastKey: false,
      },
      left: {
        pressed: false,
        lastKey: false,
      },
      down: {
        pressed: false,
        lastKey: false,
      },
      right: {
        pressed: false,
        lastKey: false,
      },
      shoot: {
        pressed: false,
      },
      shield: {
        pressed: false,
      },
    };
  }
  handleInput(player) {
    window.addEventListener("keydown", (e) => {
      if (this.left) {
        if (e.key === "w" || e.key === "W") {
          this.keys.up.pressed = true;
        } else if (e.key === "a" || e.key === "A") {
          this.keys.left.pressed = true;
        } else if (e.key === "s" || e.key === "S") {
          this.keys.down.pressed = true;
        } else if (e.key === "d" || e.key === "D") {
          this.keys.right.pressed = true;
        } else if (e.key === " ") {
          this.keys.shoot.pressed = true;
        } else if (e.key === "b" || e.key === "B") {
          this.keys.shield.pressed = true;
        }
      } else {
        if (e.key === "ArrowUp") {
          this.keys.up.pressed = true;
        } else if (e.key === "ArrowLeft") {
          this.keys.left.pressed = true;
        } else if (e.key === "ArrowDown") {
          this.keys.down.pressed = true;
        } else if (e.key === "ArrowRight") {
          this.keys.right.pressed = true;
        } else if (e.key === "Enter") {
          this.keys.shoot.pressed = true;
        } else if (e.key === "m" || e.key === "M") {
          this.keys.shield.pressed = true;
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.left) {
        if (e.key === "w" || e.key === "W") {
          this.keys.up.pressed = false;
          this.keys.up.lastKey = false;
        } else if (e.key === "a" || e.key === "A") {
          this.keys.left.pressed = false;
          this.keys.left.lastKey = false;
        } else if (e.key === "s" || e.key === "S") {
          this.keys.down.pressed = false;
          this.keys.down.lastKey = false;
        } else if (e.key === "d" || e.key === "D") {
          this.keys.right.pressed = false;
          this.keys.right.lastKey = false;
        } else if (e.key === " ") {
          this.keys.shoot.pressed = false;
        } else if (e.key === "b" || e.key === "B") {
          this.keys.shield.pressed = false;
        }
      } else {
        if (e.key === "ArrowUp") {
          this.keys.up.pressed = false;
          this.keys.up.lastKey = false;
        } else if (e.key === "ArrowLeft") {
          this.keys.left.pressed = false;
          this.keys.left.lastKey = false;
        } else if (e.key === "ArrowDown") {
          this.keys.down.pressed = false;
          this.keys.down.lastKey = false;
        } else if (e.key === "ArrowRight") {
          this.keys.right.pressed = false;
          this.keys.right.lastKey = false;
        } else if (e.key === "Enter") {
          this.keys.shoot.pressed = false;
        } else if (e.key === "m" || e.key === "M") {
          this.keys.shield.pressed = false;
        }
      }
    });

    if (player.alive) {
      if (this.keys.up.pressed && this.keys.up.lastKey === false) {
        const position = this.player.position;
        this.targets.map((t) => {
          t.checkTarget();
          if (
            t.sprite.position.x + t.sprite.width / 2 ===
              this.player.position.x + this.player.width / 2 &&
            t.up
          ) {
            t.resetTarget();
            if (
              t.sprite.position.y +
                t.sprite.height / 8 -
                this.player.height / 2 -
                this.player.position.y ===
              -62
            ) {
              if (this.player.position == position) {
                this.player.position = {
                  x: this.player.position.x,
                  y:
                    t.sprite.position.y +
                    t.sprite.height / 8 -
                    this.player.height / 2,
                };
              }
            }
          } else {
            t.resetTarget();
          }
        });
        this.keys.up.lastKey = true;
      } else if (this.keys.left.pressed && this.keys.left.lastKey === false) {
        const position = this.player.position;
        this.targets.map((t) => {
          t.checkTarget();
          if (
            t.sprite.position.y + t.sprite.height / 8 ===
              this.player.position.y + this.player.height / 2 &&
            t.left
          ) {
            t.resetTarget();
            if (
              t.sprite.position.x +
                t.sprite.width / 2 -
                this.player.width / 2 -
                this.player.position.x ===
              -62
            ) {
              if (this.player.position == position) {
                this.player.position = {
                  x:
                    t.sprite.position.x +
                    t.sprite.width / 2 -
                    this.player.width / 2,
                  y: this.player.position.y,
                };
              }
            }
          } else {
            t.resetTarget();
          }
        });
        this.keys.left.lastKey = true;
      } else if (this.keys.down.pressed && this.keys.down.lastKey === false) {
        const position = this.player.position;
        this.targets.map((t) => {
          t.checkTarget();
          if (
            t.sprite.position.x + t.sprite.width / 2 ===
              this.player.position.x + this.player.width / 2 &&
            t.down
          ) {
            t.resetTarget();
            if (
              t.sprite.position.y +
                t.sprite.height / 8 -
                this.player.height / 2 -
                this.player.position.y ===
              62
            ) {
              if (this.player.position == position) {
                this.player.position = {
                  x: this.player.position.x,
                  y:
                    t.sprite.position.y +
                    t.sprite.height / 8 -
                    this.player.height / 2,
                };
              }
            }
          } else {
            t.resetTarget();
          }
        });
        this.keys.down.lastKey = true;
      } else if (this.keys.right.pressed && this.keys.right.lastKey === false) {
        const position = this.player.position;
        this.targets.map((t) => {
          t.checkTarget();
          if (
            t.sprite.position.y + t.sprite.height / 8 ===
              this.player.position.y + this.player.height / 2 &&
            t.right
          ) {
            t.resetTarget();
            if (
              t.sprite.position.x +
                t.sprite.width / 2 -
                this.player.width / 2 -
                this.player.position.x ===
              62
            ) {
              if (this.player.position == position) {
                this.player.position = {
                  x:
                    t.sprite.position.x +
                    t.sprite.width / 2 -
                    this.player.width / 2,
                  y: this.player.position.y,
                };
              }
            }
          } else {
            t.resetTarget();
          }
        });
        this.keys.right.lastKey = true;
      }
    }
  }
}

class Player {
  constructor(playerSprite, inputHandler) {
    this.playerSprite = playerSprite;
    this.inputHandler = inputHandler;
    this.fps = 6;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.playerStats = {
      life: 6,
      ammo: 3,
      bullets: 4,
    };
    this.fire = false;
    this.damage = false;
    this.alive = true;
    this.shielded = false;
  }
  die() {
    this.playerSprite.frames.current = 0;
    this.playerSprite.layers.current = 0;  
  }
  idle() {
    this.playerSprite.frames.current = 0;
    this.playerSprite.layers.current = 1;
  }
  moveUpDown(deltaTime) {
    this.playerSprite.layers.current = 1;
    if (
      this.inputHandler.keys.up.pressed ||
      this.inputHandler.keys.down.pressed
    ) {
      if (this.frameTimer > this.frameInterval) {
        if (
          this.playerSprite.frames.current >=
          this.playerSprite.frames.max - 1
        ) {
          this.playerSprite.frames.current = 0;
        }
        this.playerSprite.frames.current++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
  }
  moveLeftRight(deltaTime) {
    this.playerSprite.layers.current = 2;
    if (
      this.inputHandler.keys.left.pressed ||
      this.inputHandler.keys.right.pressed
    ) {
      if (this.frameTimer > this.frameInterval) {
        if (
          this.playerSprite.frames.current >=
          this.playerSprite.frames.max - 1
        ) {
          this.playerSprite.frames.current = 0;
        }
        this.playerSprite.frames.current++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
  }

  shoot(deltaTime) {
    this.playerSprite.layers.current = 3;
    if (this.inputHandler.keys.shoot.pressed) {
      if (this.frameTimer > this.frameInterval) {
        if (
          this.playerSprite.frames.current >=
          this.playerSprite.frames.max - 1
        ) {
          this.playerSprite.frames.current = 0;
        }
        this.playerSprite.frames.current++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
  }

  takeDamage(deltaTime, enemyShot) {
    this.playerSprite.layers.current = 4;
    if (enemyShot) {
      if (this.frameTimer > this.frameInterval) {
        if (
          this.playerSprite.frames.current >=
          this.playerSprite.frames.max - 1
        ) {
          this.playerSprite.frames.current = 0;
        }
        this.playerSprite.frames.current++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
  }

  shield(deltaTime) {
    this.playerSprite.layers.current = 5;
    if (this.inputHandler.keys.shield.pressed) {
      if (this.frameTimer > this.frameInterval) {
        if (
          this.playerSprite.frames.current >=
          this.playerSprite.frames.max - 1
        ) {
          this.playerSprite.frames.current = 0;
        }
        this.playerSprite.frames.current++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
  }
}
