import Animation from "../../lib/Animation.js";

export default class Explosion {
    /**
     * Creates an Explosion object with a position and animation.
     * @param {Object} position - The position of the explosion {x, y}.
     */
    constructor(position) {
        this.position = position;
        this.animation = new Animation([0, 1, 2, 3], 0.02, 1);
    }

    /**
     * Updates the animation of the explosion.
     * @param {number} dt - The delta time.
     */
    update(dt) {
        this.animation.update(dt);
    }

    /**
     * Checks if the animation of the explosion is done.
     * @returns {boolean} - True if the animation is complete, false otherwise.
     */
    isDone() {
        return this.animation.isDone();
    }

    /**
     * Renders the current frame of the explosion at its position.
     * @param {Array} explosionSprites - Array of explosion sprite images.
     */
    render(explosionSprites) {
        const currentFrame = this.animation.getCurrentFrame();
        explosionSprites[currentFrame].render(this.position.x, this.position.y);
    }
}
