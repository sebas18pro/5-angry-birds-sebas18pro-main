import { input, keys, matter } from '../globals.js';
import BodyType from '../enums/BodyType.js';
import Circle from './Circle.js';
import { oneInXChance } from '../../lib/Random.js';
import GameEntity from './GameEntity.js';
import Input from '../../lib/Input.js';

export default class YellowBird extends Circle {
    static SPRITE_MEASUREMENTS = [{ x: 668, y: 879, width: 58, height: 54 }];
    static RADIUS = 20;

	/**
	 * A bird that will be launched at the pig fortress. The bird is a
	 * dynamic (i.e. non-static) Matter body meaning it is affected by
	 * the world's physics. We've given the bird a high restitution value
	 * so that it is bouncy. The label will help us manage this body later.
	 * The collision filter ensures that birds cannot collide with eachother.
	 * We've set the density to a value higher than the block's default density
	 * of 0.001 so that the bird can actually knock blocks over.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_restitution
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_label
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_collisionFilter
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_density
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		super(x, y, YellowBird.RADIUS, {
			label: BodyType.Bird,
			density: 0.008,
			restitution: 0.8,
			collisionFilter: {
				group: -1,
			},
		});

		this.sprites = GameEntity.generateSprites(YellowBird.SPRITE_MEASUREMENTS);
		this.renderOffset = { x: -25, y: -30 };
        this.velocity = this.body.velocity
		this.isWaiting = true;
		this.isJumping = false;
		this.isSlingShot = true;
        this.perk = false
	}

	update(dt) {
		super.update(dt);

		if (this.isWaiting) {
			this.randomlyJump();
            

		}
        if(input.isKeyHeld(Input.KEYS.SPACE) && !this.isOnGround() && !this.perk && !this.isSlingShot){
            
            this.fast()
        }
	}

	randomlyJump() {
		if (!this.isJumping && oneInXChance(1000)) {
			this.jump();
		}

		if (this.isOnGround()) {
			this.isJumping = false;
		}
	}
    fast(){
        this.perk = true
        matter.Body.applyForce(this.body, this.body.position, {
			x: this.velocity.x * 0.05,
			y: this.velocity.y * 0.05,
		});
        
    }

	jump() {
		this.isJumping = true;

		// https://brm.io/matter-js/docs/classes/Body.html#method_applyForce
		matter.Body.applyForce(this.body, this.body.position, {
			x: 0.0,
			y: -0.2,
		});
	}
}
