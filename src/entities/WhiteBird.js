import { input, keys, matter } from '../globals.js';
import BodyType from '../enums/BodyType.js';
import Circle from './Circle.js';
import { oneInXChance } from '../../lib/Random.js';
import GameEntity from './GameEntity.js';
import Input from '../../lib/Input.js';
import Level from '../objects/Level.js';
import Egg from './Egg.js';
import Animation from '../../lib/Animation.js';


export default class WhiteBird extends Circle {
	static SPRITE_MEASUREMENTS = [
		{ x: 410, y: 542, width: 80, height: 93 },
		{ x: 410, y: 353, width: 80, height: 93 },
		{ x: 410, y: 448, width: 80, height: 93 },
		{ x: 493, y: 353, width: 85, height: 93 },
		{ x: 667, y: 752, width: 50, height: 65 },
		{ x: 668, y: 820, width: 45, height: 57 },
	];
	static RADIUS = 36;

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
		super(x, y, WhiteBird.RADIUS, {
			label: BodyType.Bird,
			density: 0.008,
			restitution: 0.4,
			collisionFilter: {
				group: -1,
			},
		});

		this.sprites = GameEntity.generateSprites(WhiteBird.SPRITE_MEASUREMENTS);
		this.renderOffset = { x: -45, y: -53 };
		this.velocity = this.body.velocity
		this.isWaiting = true;
		this.isJumping = false;
		this.perk = false
		this.shouldLayEgg = false
		this.isSlingShot = true
		this.animation = {
			["shitEgg"] : new Animation([1,2,3,4], 0.02, 1)
		}
		this.displayAnimation = false
	}

	update(dt) {
		super.update(dt);

		if (this.isWaiting) {
			this.randomlyJump();


		}


		if (input.isKeyHeld(Input.KEYS.SPACE) && !this.isOnGround() && !this.perk && !this.isSlingShot) {
			this.shouldLayEgg = true
			this.displayAnimation = true
			
		}
		if(this.displayAnimation){
			//console.log("het")
			this.animation["shitEgg"].update(dt)
			this.currentFrame = this.animation["shitEgg"].getCurrentFrame()
			if(this.currentFrame == 4){
				this.displayAnimation = false
			}
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


	jump() {
		this.isJumping = true;

		// https://brm.io/matter-js/docs/classes/Body.html#method_applyForce
		matter.Body.applyForce(this.body, this.body.position, {
			x: 0.0,
			y: -0.2,
		});
	}
}
