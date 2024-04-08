class Title {
    constructor(x, y, text = "", fontSize = 20, color = "#fff") {
        this.position = { x: x, y: y };
        this.text = text;
        this.fontSize = fontSize;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.beginPath();
        ctx.fillText(this.text, this.position.x, this.position.y);
        ctx.closePath();
        ctx.fill();
    }
}

export default Title;