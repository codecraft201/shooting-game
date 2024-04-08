class Bullet {
    constructor(x, y) {
        this.width = 10;
        this.height = 10;
        this.position = { x: x - (this.width / 2), y: y - this.height };
        this.velocity = { x: 0, y: 0 };
        this.color = "yellow";
        this.speed = 14;
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

export default Bullet;