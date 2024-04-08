import Bullet from "./bullet.js";

class Player {
    constructor(x, y, bullets) {
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.bullets = bullets;
        this.width = 50;
        this.height = 50;
        this.color = "blue";
        this.speed = 5;
        this.health = 100;
        this.maxHealth = 100;
        this.fireRate = 10;
        this.lastFireTime = 0;
        this.score = 0;
        this.damage = 10;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
    }

    shoot() {
        const currentTime = Date.now();

        if (currentTime > this.lastFireTime + (1000 / this.fireRate)) {
            const bulletX = this.position.x + (this.width / 2);
            const bulletY = this.position.y;
            this.bullets.push(new Bullet(bulletX, bulletY));
            this.lastFireTime = currentTime;
        }
    }

    move(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    takeDamage() {
        this.health -= this.damage;
    }
}

export default Player;