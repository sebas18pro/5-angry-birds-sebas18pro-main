import { matter,timer } from '../globals.js';
import BodyType from '../enums/BodyType.js';
import Circle from './Circle.js';
import { oneInXChance } from '../../lib/Random.js';
import GameEntity from './GameEntity.js';
import Timer from '../../lib/Timer.js';

export default class Egg extends Circle {
	static SPRITE_MEASUREMENTS = [{ x: 668, y: 820, width: 45, height: 57 }];
	static RADIUS = 20;
	static changeLevel = false

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
		super(x, y, Egg.RADIUS, {
			label: BodyType.Bird,
			density: 0.08,
			restitution: 0.8,
			collisionFilter: {
				group: -1,
			},
		});

		this.sprites = GameEntity.generateSprites(Egg.SPRITE_MEASUREMENTS);
		this.renderOffset = { x: -25, y: -23 };
		this.isGone = false;
		this.isWaiting = true;
		this.isJumping = false;

		setTimeout(() => {
			this.isGone = true
		}, 4000);

		// timer.addTask(() => {  
		// 	console.log("hi")
        // },1,4,() => this.isGone = true)
		
	}

	update(dt) {
		super.update(dt);
		console.log(this.isGone)
		
	}

	

	
}
