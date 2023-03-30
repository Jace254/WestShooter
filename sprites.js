const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 404;

c.fillStyle = "#222034";
c.fillRect(0, 0, canvas.width, canvas.height);

const backgroundImage = new Image();
backgroundImage.src = './assets/background.png';
backgroundImage.style = {
    "opacity": "20%"
}
const backgroundSprite = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: backgroundImage
})

const platforms = []

for (let i = 1; i <= 9; i++) {
    const platformImage = new Image();
    platformImage.src = "./assets/platform.png"
    // const bottom = (i % 3 === 0)
    const center = (i % 3 === 2);
    const top = (i % 3 === 1);
    const left = (i < 4)
    const mid = (i < 7 && i > 3)
    // const right = (i > 6)
    const x = (left) ? canvas.width / 4 - platformImage.width / 2 - platformImage.width :
        (mid) ? canvas.width / 4 - platformImage.width / 2 :
            canvas.width / 4 - platformImage.width / 2 + platformImage.width


    const y = (top) ? (canvas.height / 2 - platformImage.height / 16) - platformImage.height / 2 :
        (center) ? (canvas.height / 2 - platformImage.height / 16) :
            (canvas.height / 2 - platformImage.height / 16) + platformImage.height / 2


    const platformSprite = new Sprite({
        position: {
            x: x,
            y: y
        },
        image: platformImage,
        frames: {
            max: 1,
            current: 0
        },
        layers: {
            max: 2,
            current: 0
        }
    })
    platforms.push(platformSprite)
}

//players
const leftPlayerImage = new Image();
leftPlayerImage.src = "./assets/left_shooter.png";
const leftPlayerSprite = new Sprite({
    position: {
        x: canvas.width / 4 - leftPlayerImage.width / 5 / 2,
        y: canvas.height / 2 - leftPlayerImage.height / 2 / 2,
    },
    image: leftPlayerImage,
    frames: {
        max: 5,
        current: 0,
    },
    layers: {
        max: 2,
        current: 0,
    },
});

const leftTargets = platforms.map(p => {
    const target = new Target(p,leftPlayerSprite)
    return target
})
