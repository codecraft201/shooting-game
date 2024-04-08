class Enemy {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.width = width;
        this.height = height;
        this.color = "red";
        this.speed = 2;
        this.maxHealth = 100;
        this.health = this.maxHealth;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
    }

    move(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }
}

export default Enemy;