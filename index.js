const leftPlayerInputHandler = new InputHandler(
    leftPlayerSprite,
    leftTargets,
    true
);
const leftPlayer = new Player(leftPlayerSprite, leftPlayerInputHandler);
const rightPlayerInputHandler = new InputHandler(
    rightPlayerSprite,
    rightTargets,
    false
);
const rightPlayer = new Player(rightPlayerSprite, rightPlayerInputHandler);

let lastTime = 0;

//animate function
const animate = (timeStamp) => {
    window.requestAnimationFrame(animate);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillRect(0, 0, canvas.width, canvas.height);
    backgroundSprite.draw();
  // UI
  //UI groups
    leftUIGroup.lifeBar.map((l) => l.draw());
    leftUIGroup.ammoBar.map((a) => a.draw());
    leftUIGroup.bulletBar.map((b) => b.draw());
    rightUIGroup.lifeBar.map((l) => l.draw());
    rightUIGroup.ammoBar.map((a) => a.draw());
    rightUIGroup.bulletBar.map((b) => b.draw());
  //platforms
    leftPlatforms.map((p) => p.draw());
    rightPlatforms.map((p) => p.draw());

    //players
    leftPlayerSprite.draw();
    rightPlayerSprite.draw();
  //movement
    leftPlayerSprite.update(
        leftPlayerInputHandler,
        leftPlayer,
        deltaTime,
        leftUIGroup,
        true,
        rightPlayer
    );
    rightPlayerSprite.update(
        rightPlayerInputHandler,
        rightPlayer,
        deltaTime,
        rightUIGroup,
        false,
        leftPlayer
    );
  filterSprite.draw()
};
animate(0);
