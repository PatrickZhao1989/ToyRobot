// Types
export type RobotCoordinate = {
	x: number
	y: number
}

export type RobotPosition = {
	coordinate: RobotCoordinate
	direction: RobotDirection
}

// Enums
export enum RobotDirection {
	NORTH = "NORTH",
	SOUTH = "SOUTH",
	EAST = "EAST",
	WEST = "WEST",
}

export enum RobotRotation {
	LEFT = "LEFT",
	RIGHT = "RIGHT",
}

// Interfaces
export interface IRobot {
	Dimension: {
		width: number
		length: number
	}
	place(initialPosition: RobotPosition): void
	move(position: RobotPosition): RobotPosition | Error
	rotate(rotation: RobotRotation): RobotPosition | Error
	reset(): void
	report(): string
}
