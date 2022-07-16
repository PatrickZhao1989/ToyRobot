import { IRobot, RobotDirection, RobotPosition, RobotRotation } from "../models"
import { CONSTANTS } from "../crosscutting/constants"
export class Robot implements IRobot {
	Dimension: { width: number; length: number }
	private _currentPosition: RobotPosition

	public Robot() {
		this.Dimension = {
			width: CONSTANTS.BOARDDIMENSIONS.WIDTH,
			length: CONSTANTS.BOARDDIMENSIONS.LENGTH,
		}
		// Default facing north
		this.reset()
	}

	place(initialPosition: RobotPosition): void {
		this._currentPosition = initialPosition
	}

	move(): RobotPosition {
		// TODO Prevent failing
		switch (this._currentPosition.direction) {
			case RobotDirection.EAST: {
				this._currentPosition.coordinate.x++
				break
			}
			case RobotDirection.NORTH: {
				this._currentPosition.coordinate.y++
				break
			}
			case RobotDirection.WEST: {
				this._currentPosition.coordinate.x--
				break
			}
			case RobotDirection.SOUTH: {
				this._currentPosition.coordinate.y++
				break
			}
		}

		return this._currentPosition
	}

	reset(): void {
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
}
