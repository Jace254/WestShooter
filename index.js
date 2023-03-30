const playerInputHandler = new InputHandler(leftPlayerSprite, leftTargets);

//animate function
const animate = () => {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillRect(0, 0, canvas.width, canvas.height);
    //ui
    platforms.map(p => p.draw())
    //players
    leftPlayerSprite.draw();
    //movement
    leftPlayerSprite.update(playerInputHandler)
    backgroundSprite.draw()
};
animate();


