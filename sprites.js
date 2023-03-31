const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 750;
canvas.height = 500;

c.fillStyle = "#c77438";
c.fillRect(0, 0, canvas.width, canvas.height);


const backgroundImage = new Image()
backgroundImage.src = './assets/background.png';
const backgroundSprite = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: backgroundImage
})

const leftUIGroup = {
    leftLifeBar: null,
    leftAmmoBar: null,
    leftBulletBar: null
}

const leftLifeBar = []
let lifeBarY;

for (let i = 0; i < 5; i++) {
    const lifeImage = new Image();
    lifeImage.src = './assets/life_heart.png'
    lifeBarY = canvas.height / 8 - lifeImage.height / 2
    const lifeSprite = new Sprite({
        position: {
            x: canvas.width / 2 - lifeImage.width / 2 - (lifeImage.width * i) - 50,
            y: lifeBarY
        },
        image: lifeImage,
        layers: {
            max: 3,
            current: 1
        }
    })
    leftLifeBar.push(lifeSprite)
}

const leftAmmoBar = []
let ammoBarY;
for (let i = 0; i < 3; i++) {
    const ammoImage = new Image();
    ammoImage.src = './assets/ammo.png'
    ammoBarY = canvas.height / 8 - ammoImage.height / 3 + lifeBarY
    const ammoSprite = new Sprite({
        position: {
            x: canvas.width / 2 - ammoImage.width / 2 - (ammoImage.width * i) - 50,
            y: ammoBarY
        },
        image: ammoImage,
        layers: {
            max: 3,
            current: 1
        }
    })
    leftAmmoBar.push(ammoSprite)
}

const leftBulletBar = []
for (let i = 0; i < 4; i++) {
    const bulletImage = new Image();
    bulletImage.src = './assets/bullet.png'
    const bulletSprite = new Sprite({
        position: {
            x: canvas.width / 2 - bulletImage.width / 2 - (bulletImage.width * i) - 50,
            y: canvas.height / 8 - bulletImage.height / 4 + ammoBarY
        },
        image: bulletImage,
        layers: {
            max: 4,
            current: 2
        }
    })
    leftBulletBar.push(bulletSprite)
}

leftUIGroup.leftLifeBar = leftLifeBar
leftUIGroup.leftAmmoBar = leftAmmoBar
leftUIGroup.leftBulletBar = leftBulletBar

const rigthUIGroup = {
    rightLifeBar: null,
    rightAmmoBar: null,
    rightBulletBar: null
}

const rightLifeBar = []
let rLifeBarY;

for (let i = 0; i < 5; i++) {
    const lifeImage = new Image();
    lifeImage.src = './assets/life_heart.png'
    rLifeBarY = canvas.height / 8 - lifeImage.height / 2
    const lifeSprite = new Sprite({
        position: {
            x: canvas.width / 2 - lifeImage.width / 2 + (lifeImage.width * i) + 50,
            y: lifeBarY
        },
        image: lifeImage,
        layers: {
            max: 3,
            current: 0
        }
    })
    rightLifeBar.push(lifeSprite)
}

const rightAmmoBar = []
let rAmmoBarY;
for (let i = 0; i < 3; i++) {
    const ammoImage = new Image();
    ammoImage.src = './assets/ammo.png'
    rAmmoBarY = canvas.height / 8 - ammoImage.height / 3 + rLifeBarY
    const ammoSprite = new Sprite({
        position: {
            x: canvas.width / 2 - ammoImage.width / 2 + (ammoImage.width * i) + 50,
            y: rAmmoBarY
        },
        image: ammoImage,
        layers: {
            max: 3,
            current: 0
        }
    })
    rightAmmoBar.push(ammoSprite)
}

const rightBulletBar = []
for (let i = 0; i < 4; i++) {
    const bulletImage = new Image();
    bulletImage.src = './assets/bullet.png'
    const bulletSprite = new Sprite({
        position: {
            x: canvas.width / 2 - bulletImage.width / 2 + (bulletImage.width * i) + 50,
            y: canvas.height / 8 - bulletImage.height / 4 + rAmmoBarY
        },
        image: bulletImage,
        layers: {
            max: 4,
            current: 0
        }
    })
    rightBulletBar.push(bulletSprite)
}

rigthUIGroup.rightLifeBar = rightLifeBar
rigthUIGroup.rightAmmoBar = rightAmmoBar
rigthUIGroup.rightBulletBar = rightBulletBar

const filterImage = new Image();
filterImage.src = './assets/filter.png';
const filterSprite = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: filterImage
})

const leftPlatforms = []

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
            y: y + 75
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
    leftPlatforms.push(platformSprite)
}

const rightPlatforms = []

for (let i = 1; i <= 9; i++) {
    const platformImage = new Image();
    platformImage.src = "./assets/platform.png"
    // const bottom = (i % 3 === 0)
    const center = (i % 3 === 2);
    const top = (i % 3 === 1);
    const left = (i < 4)
    const mid = (i < 7 && i > 3)
    // const right = (i > 6)
    const x = (left) ? canvas.width * 3 / 4 - platformImage.width / 2 - platformImage.width :
        (mid) ? canvas.width * 3 / 4 - platformImage.width / 2 :
            canvas.width * 3 / 4 - platformImage.width / 2 + platformImage.width


    const y = (top) ? (canvas.height / 2 - platformImage.height / 16) - platformImage.height / 2 :
        (center) ? (canvas.height / 2 - platformImage.height / 16) :
            (canvas.height / 2 - platformImage.height / 16) + platformImage.height / 2


    const platformSprite = new Sprite({
        position: {
            x: x,
            y: y + 75
        },
        image: platformImage,
        frames: {
            max: 1,
            current: 0
        },
        layers: {
            max: 2,
            current: 1
        }
    })
    rightPlatforms.push(platformSprite)
}

//players
const leftPlayerImage = new Image();
leftPlayerImage.src = "./assets/left_shooter.png";
const leftPlayerSprite = new Sprite({
    position: {
        x: canvas.width / 4 - leftPlayerImage.width / 5 / 2,
        y: canvas.height / 2 - leftPlayerImage.height / 3 / 2 + 75,
    },
    image: leftPlayerImage,
    frames: {
        max: 5,
        current: 0,
    },
    layers: {
        max: 3,
        current: 0,
    },
});

const leftTargets = leftPlatforms.map(p => {
    const target = new Target(p,leftPlayerSprite)
    return target
})

const rightTargets = rightPlatforms.map(p => {
    const target = new Target(p, leftPlayerSprite)
    return target
})
