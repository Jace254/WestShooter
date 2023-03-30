const playerInputHandler = new InputHandler(leftPlayerSprite, leftTargets);
const leftPlayer = new Player(leftPlayerSprite, playerInputHandler)

let lastTime = 0

//animate function
const animate = (timeStamp) => {
    window.requestAnimationFrame(animate);
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillRect(0, 0, canvas.width, canvas.height);
    //ui
    platforms.map(p => p.draw())
    //players
    leftPlayerSprite.draw();
    //movement
    leftPlayerSprite.update(playerInputHandler, leftPlayer, deltaTime)
    backgroundSprite.draw()
};
animate(0);


