// Import all modules
import Player from "./player.js";
import Enemy from "./enemy.js";
import Title from "./title.js";
import InputHandler from "./inputHandler.js";

// Get canvas element
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas width and height
canvas.width = innerWidth;
canvas.height = innerHeight;

let enemies = [];
let bullets = [];

let gameOver = false;

// Create a Game class
class Game {
    constructor() {
        this.inputHandler = new InputHandler(canvas);
        this.player = new Player(200, canvas.height - 80, bullets);
        this.scoreTitle = new Title(80, 35, "Score: 0", 20);
        this.healthTitle = new Title(canvas.width - 35 * 2, 35, "Health: 100", 20, "Yellow");
        this.gameOverTitle = new Title(canvas.width / 2, canvas.height / 2, "Game Over!", 50);
        this.messageTitle = new Title(canvas.width / 2, canvas.height / 2 + 80, "Reset to press Escape key", 16, "f3f3f3");

        // Create enemies
        for (let i = 0; i < 12; i++) {
            const enemyWidth = 50;
            const enemyHeight = 50;
            const enemyX = this.getRandomNumber(0, canvas.width - enemyWidth);
            const enemyY = this.getRandomNumber(-canvas.height, -enemyHeight);
            enemies.push(new Enemy(enemyX, enemyY, enemyWidth, enemyHeight));
        }
    }

    reset() {
        this.player.health = this.player.maxHealth;
        enemies.forEach(enemy => game.setEnemyPosition(enemy));
        bullets.forEach((bullet, index) => {
            bullets.splice(index);
        });
        gameOver = false;
    }

    render() {
        // Draw the enemies
        enemies.forEach(function (enemy, enemyIndex) {
            enemy.draw(ctx);
            enemy.update();
            enemy.move(0, 1);

            // Check enemy position y outside canvas
            if (enemy.position.y > canvas.height) {
                game.setEnemyPosition(enemy);
            }

            // Check collision with enemy and player
            if (game.collision(enemy, game.player)) {
                if (game.player.health > 0) {
                    game.player.takeDamage();
                }
                game.setEnemyPosition(enemy);
            }

            // Check collision with enemy and bullet
            bullets.forEach(function (bullet, bulletIndex) {
                if (game.collision(enemy, bullet)) {
                    enemy.health -= 10;
                    bullets.splice(bulletIndex, 1);

                    // If enemy health is low, move random x, y position
                    if (enemy.health <= 0) {
                        game.updateScore();
                        game.setEnemyPosition(enemy);
                        enemy.health = enemy.maxHealth;
                    }
                }
            });
        });

        // Set current score
        this.scoreTitle.text = "SCORE: " + this.player.score;

        // Set current health value
        this.healthTitle.text = "Health: " + this.player.health;

        // Draw the player
        this.player.draw(ctx);
        this.player.update();
        this.player.shoot();

        if (this.player.health <= 0) {
            gameOver = true;
        }

        // Checking the key pressed
        if (this.inputHandler.leftPressed && this.player.position.x > 0) {
            this.player.move(-1, 0);
        } else if (
            this.inputHandler.rightPressed &&
            this.player.position.x < canvas.width - this.player.width
        ) {
            this.player.move(1, 0);
        } else {
            this.player.move(0, 0);
        }

        // Draw the bullets
        bullets.forEach(function (bullet, index) {
            bullet.draw(ctx);
            bullet.update();
            bullet.move(0, -1);
        });

        // Draw the score title
        this.scoreTitle.draw(ctx);

        // Draw the health title
        this.healthTitle.draw(ctx);
    }

    updateScore() {
        this.player.score += 10;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    setEnemyPosition(enemy) {
        enemy.position.x = this.getRandomNumber(0, canvas.width - enemy.width);
        enemy.position.y = this.getRandomNumber(-canvas.height, -enemy.height);
    }

    collision(object1, object2) {
        if (this.intersect(object1, object2)) {
            return true;
        } else {
            return false;
        }
    }

    // Rectangle intersect
    intersect(object1, object2) {
        return (
            object1.position.x < object2.position.x + object2.width &&
            object1.position.x + object1.width > object2.position.x &&
            object1.position.y < object2.position.y + object2.height &&
            object1.position.y + object1.height > object2.position.y
        );
    }

    displayGameOver() {
        this.gameOverTitle.draw(ctx);
        this.messageTitle.draw(ctx);
    }
}

// Create a game object
const game = new Game();

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// Animation loop
function gameLoop() {
    requestAnimationFrame(gameLoop);
    clearCanvas();
    if (!gameOver) {
        game.render();
    } else {
        game.displayGameOver();
    }
    if (game.inputHandler.escapePressed) {
        game.reset();
    }
}

gameLoop(); // Start animation loop
