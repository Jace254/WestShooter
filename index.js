const leftPlayerInputHandler = new InputHandler(leftPlayerSprite, leftTargets);
const leftPlayer = new Player(leftPlayerSprite, leftPlayerInputHandler)

let lastTime = 0

//animate function
const animate = (timeStamp) => {
    window.requestAnimationFrame(animate);
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillRect(0, 0, canvas.width, canvas.height);
    backgroundSprite.draw()
    // UI
    //UI groups
    leftUIGroup.lifeBar.map(l => l.draw())
    leftUIGroup.ammoBar.map(a => a.draw())
    leftUIGroup.bulletBar.map(b => b.draw())
    rigthUIGroup.lifeBar.map(l => l.draw())
    rigthUIGroup.ammoBar.map(a => a.draw())
    rigthUIGroup.bulletBar.map(b => b.draw())
    //platforms
    leftPlatforms.map(p => p.draw())
    rightPlatforms.map(p => p.draw())

    //players
    leftPlayerSprite.draw();
    //movement
    leftPlayerSprite.update(leftPlayerInputHandler, leftPlayer, deltaTime, leftUIGroup)
    filterSprite.draw()
};
animate(0);


