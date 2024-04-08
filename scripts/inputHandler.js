class InputHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftPressed = false;
        this.rightPressed = false;
        this.escapePressed = false;

        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }

    keyDown(e) {
        if (e.keyCode == 37) {
            this.leftPressed = true;
        } else if (e.keyCode == 39) {
            this.rightPressed = true;
        } else if (e.keyCode == 27) {
            this.escapePressed = true;
        }
        
    }

    keyUp(e) {
        if (e.keyCode == 37) {
            this.leftPressed = false;
        } else if (e.keyCode == 39) {
            this.rightPressed = false;
        } else if (e.keyCode == 27) {
            this.escapePressed = false;
        }
    }
}

export default InputHandler;
