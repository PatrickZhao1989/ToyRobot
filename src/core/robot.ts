import { IRobot, RobotDirection, RobotPosition, RobotRotation } from "../models"

export class Robot implements IRobot {
	Dimension: { width: number; length: number }
	private _currentPosition: RobotPosition

	constructor(defaultWith: number, defaultLength: number) {
		this.Dimension = {
			width: defaultWith, // x axis
			length: defaultLength, // y axis
		}
	}

	//Assumption Place always reset gives people a fresh start
	place(initialPosition: RobotPosition): void {
		// TODO create specific error messages, making error tracing easier
		if (!this.Dimension) {
			throw Error("No Robot initialized")
		}

		if (!initialPosition.direction) {
			throw Error("no direction supplied")
		}
		if (!Number.isInteger(initialPosition.coordinate.x) || !Number.isInteger(initialPosition.coordinate.y)) {
			throw Error("initial position's coordinates have to be integers")
		}

		if (initialPosition.coordinate.x < 0 || initialPosition.coordinate.x >= this.Dimension.width) {
			throw Error(`initial position x need to be within [0,${this.Dimension.width})`)
		}

		if (initialPosition.coordinate.y < 0 || initialPosition.coordinate.y >= this.Dimension.length) {
			throw Error(`initial position y coordinate need to be within [0,${this.Dimension.length})`)
		}
		this._currentPosition = {
			coordinate: {
				x: initialPosition.coordinate.x,
				y: initialPosition.coordinate.y,
			},
			direction: initialPosition.direction,
		}
	}

	move(): RobotPosition {
		// Any movement that would result in the robot falling from the table must be prevented,
		// however further valid movement commands must still be allowed.

		// Movement beyond the boundary will not make robot move, robot still stays the same position
		switch (this._currentPosition.direction) {
			case RobotDirection.EAST: {
				if (this._currentPosition.coordinate.x < this.Dimension.width - 1) this._currentPosition.coordinate.x++
				break
			}
			case RobotDirection.NORTH: {
				if (this._currentPosition.coordinate.y < this.Dimension.length - 1) this._currentPosition.coordinate.y++
				break
			}
			case RobotDirection.WEST: {
				if (this._currentPosition.coordinate.x > 0) this._currentPosition.coordinate.x--
				break
			}
			case RobotDirection.SOUTH: {
				if (this._currentPosition.coordinate.y > 0) this._currentPosition.coordinate.y--
				break
			}
		}

		return this._currentPosition
	}

	reset(): void {
		// Default facing north
		this._currentPosition = {
			coordinate: {
				x: 0,
				y: 0,
			},
			direction: RobotDirection.NORTH,
		}
	}

	rotate(rotation: RobotRotation): RobotPosition | Error {
		switch (rotation) {
			case RobotRotation.LEFT: {
				this._rotateLeft()
				break
			}
			case RobotRotation.RIGHT: {
				this._rotateRight()
				break
			}
		}
		return this._currentPosition
	}

	getCurrentPosition(): RobotPosition {
		return this._currentPosition
	}

	report(): string {
		return `Current location is ${this._currentPosition.coordinate.x}, ${this._currentPosition.coordinate.y}, Facing ${this._currentPosition.direction}`
	}

	private _rotateLeft(): void {
		switch (this._currentPosition.direction) {
			case RobotDirection.EAST: {
				this._currentPosition.direction = RobotDirection.NORTH
				break
			}
			case RobotDirection.NORTH: {
				this._currentPosition.direction = RobotDirection.WEST
				break
			}
			case RobotDirection.WEST: {
				this._currentPosition.direction = RobotDirection.SOUTH
				break
			}
			case RobotDirection.SOUTH: {
				this._currentPosition.direction = RobotDirection.EAST
				break
			}
		}
	}

	private _rotateRight(): void {
		switch (this._currentPosition.direction) {
			case RobotDirection.EAST: {
				this._currentPosition.direction = RobotDirection.SOUTH
				break
			}
			case RobotDirection.NORTH: {
				this._currentPosition.direction = RobotDirection.EAST
				break
			}
			case RobotDirection.WEST: {
				this._currentPosition.direction = RobotDirection.NORTH
				break
			}
			case RobotDirection.SOUTH: {
				this._currentPosition.direction = RobotDirection.WEST
				break
			}
		}
	}
}
