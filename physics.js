class Sprite {
    constructor({
        position,
        image,
        frames = {
            max: 1,
            current: 0
        },
        layers = {
            max: 1,
            current: 0
        }
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
                y: this.position.y - this.height / 2
            }
        };

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

    update(inputHandler, player, deltaTime) {
        inputHandler.handleInput()
        //actions animation
        if (!inputHandler.keys.up.pressed && !inputHandler.keys.down.pressed && !inputHandler.keys.left.pressed && !inputHandler.keys.right.pressed && !inputHandler.keys.shoot.pressed) {
            player.idle()
        }
        if (inputHandler.keys.up.pressed == true || inputHandler.keys.down.pressed == true) {
            player.moveUpDown(deltaTime)
        }
        if (inputHandler.keys.left.pressed == true || inputHandler.keys.right.pressed == true) {
            player.moveLeftRight(deltaTime)
        }
        if (inputHandler.keys.shoot.pressed) {
            player.shoot(deltaTime)
        }
    }
}

class Target {
    constructor(sprite, player) {
        this.player = player
        this.sprite = sprite
        this.up = false
        this.left = false
        this.down = false
        this.right = false
    }

    checkTarget() {
        if ((this.sprite.position.y + this.sprite.height / 8) < (this.player.position.y + this.player.height / 2)) {
            this.up = true
        }
        if ((this.sprite.position.x + this.sprite.width / 2) > (this.player.position.x + this.player.width / 2)) {
            this.right = true
        }
        if ((this.sprite.position.y + this.sprite.height / 8) > (this.player.position.y + this.player.height / 2)) {
            this.down = true
        }
        if ((this.sprite.position.x + this.sprite.width / 2) < (this.player.position.x + this.player.width / 2)) {
            this.left = true
        }
    }

    resetTarget() {
        this.up = false
        this.left = false
        this.down = false
        this.right = false
    }
}

class InputHandler {
    constructor(player, targets) {
        this.player = player
        this.targets = targets
        this.keys = {
            up: {
                pressed: false,
                lastKey: false
            },
            left: {
                pressed: false,
                lastKey: false
            },
            down: {
                pressed: false,
                lastKey: false
            },
            right: {
                pressed: false,
                lastKey: false
            },
            shoot: {
                pressed: false,
            }
        };
    }
    handleInput() {
        window.addEventListener("keydown", (e) => {

            if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
                this.keys.up.pressed = true;
            }
            else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
                this.keys.left.pressed = true;
            }
            else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
                this.keys.down.pressed = true;
            }
            else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
                this.keys.right.pressed = true;
            } else if (e.key === " ") {
                this.keys.shoot.pressed = true
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
                this.keys.up.pressed = false;
                this.keys.up.lastKey = false;
            }
            else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
                this.keys.left.pressed = false;
                this.keys.left.lastKey = false;
            }
            else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
                this.keys.down.pressed = false;
                this.keys.down.lastKey = false;
            }
            else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
                this.keys.right.pressed = false;
                this.keys.right.lastKey = false;
            } else if (e.key === " ") {
                this.keys.shoot.pressed = false
            }
        });

        if (this.keys.up.pressed && this.keys.up.lastKey === false) {
            const position = this.player.position
            this.targets.map(t => {
                t.checkTarget()
                if ((t.sprite.position.x + t.sprite.width / 2) === (this.player.position.x + this.player.width / 2) && t.up) {
                    t.resetTarget()
                    if ((t.sprite.position.y + t.sprite.height / 8 - this.player.height / 2 - this.player.position.y) === -62) {
                        if (this.player.position == position) {
                            this.player.position = {
                                x: this.player.position.x,
                                y: t.sprite.position.y + t.sprite.height / 8 - this.player.height / 2
                            };

                        }
                    }
                } else {
                    t.resetTarget()
                }
            })
            this.keys.up.lastKey = true
        } else if (this.keys.left.pressed && this.keys.left.lastKey === false) {
            const position = this.player.position
            this.targets.map(t => {
                t.checkTarget()
                if ((t.sprite.position.y + t.sprite.height / 8) === (this.player.position.y + this.player.height / 2) && t.left) {
                    t.resetTarget()
                    if ((t.sprite.position.x + t.sprite.width / 2 - this.player.width / 2 - this.player.position.x) === -62) {
                        if (this.player.position == position) {
                            this.player.position = {
                                x: t.sprite.position.x + t.sprite.width / 2 - this.player.width / 2,
                                y: this.player.position.y
                            };
                        }

                    }
                } else {
                    t.resetTarget()
                }
            })
            this.keys.left.lastKey = true
        } else if (this.keys.down.pressed && this.keys.down.lastKey === false) {
            const position = this.player.position
            this.targets.map(t => {
                t.checkTarget()
                if ((t.sprite.position.x + t.sprite.width / 2) === (this.player.position.x + this.player.width / 2) && t.down) {
                    t.resetTarget()
                    if ((t.sprite.position.y + t.sprite.height / 8 - this.player.height / 2 - this.player.position.y) === 62) {
                        if (this.player.position == position) {
                            this.player.position = {
                                x: this.player.position.x,
                                y: t.sprite.position.y + t.sprite.height / 8 - this.player.height / 2
                            };
                        }
                    }
                } else {
                    t.resetTarget()
                }
            })
            this.keys.down.lastKey = true
        } else if (this.keys.right.pressed && this.keys.right.lastKey === false) {
            const position = this.player.position
            this.targets.map(t => {
                t.checkTarget()
                if ((t.sprite.position.y + t.sprite.height / 8) === (this.player.position.y + this.player.height / 2) && t.right) {
                    t.resetTarget()
                    if ((t.sprite.position.x + t.sprite.width / 2 - this.player.width / 2 - this.player.position.x) === 62) {
                        if (this.player.position == position) {
                            this.player.position = {
                                x: t.sprite.position.x + t.sprite.width / 2 - this.player.width / 2,
                                y: this.player.position.y
                            };
                        }

                    }
                } else {
                    t.resetTarget()
                }
            })
            this.keys.right.lastKey = true
        }
    }
}

class Player {
    constructor(playerSprite, inputHandler) {
        this.playerSprite = playerSprite
        this.inputHandler = inputHandler
        this.fps = 6
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps
    }
    idle() {
        this.playerSprite.frames.current = 0
        this.playerSprite.layers.current = 0
    }
    moveUpDown(deltaTime) {
        if (this.inputHandler.keys.up.pressed || this.inputHandler.keys.down.pressed) {
            if (this.frameTimer > this.frameInterval) {
                if (this.playerSprite.frames.current >= this.playerSprite.frames.max - 1) {
                    this.playerSprite.frames.current = 0
                }
                this.playerSprite.frames.current++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    moveLeftRight(deltaTime) {
        this.playerSprite.layers.current = 1
        if (this.inputHandler.keys.left.pressed || this.inputHandler.keys.right.pressed) {
            if (this.frameTimer > this.frameInterval) {
                if (this.playerSprite.frames.current >= this.playerSprite.frames.max - 1) {
                    this.playerSprite.frames.current = 0
                }
                this.playerSprite.frames.current++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
        }
    }

    shoot(deltaTime) {
        this.playerSprite.layers.current = 2
        if (this.inputHandler.keys.shoot.pressed) {
            if (this.frameTimer > this.frameInterval) {
                if (this.playerSprite.frames.current >= this.playerSprite.frames.max - 1) {
                    this.playerSprite.frames.current = 0
                }
                this.playerSprite.frames.current++
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
        }
    }

    takeDamage() {

    }
}