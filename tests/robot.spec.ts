import chai from "chai"
import { Robot } from "../src/core/robot"
import { RobotDirection, RobotPosition, RobotRotation } from "../src/models"

describe("Robot tests", () => {
	it("Robot should be initialized", function () {
		// Arrange and Act
		const robot = new Robot(5, 5)
		// Assert
		chai.expect(robot.Dimension.length).equal(5)
		chai.expect(robot.Dimension.width).equal(5)
	})

	it("Robot should be initialized and placed", function () {
		// Arrange
		const initialPosition: RobotPosition = {
			coordinate: {
				x: 2,
				y: 3,
			},
			direction: RobotDirection.SOUTH,
		}
		const robot = new Robot(5, 5)

		// Act

		robot.place(initialPosition)
		const currentPosition = robot.getCurrentPosition()

		// Assert
		chai.expect(currentPosition.coordinate.x).equal(2)
		chai.expect(currentPosition.coordinate.y).equal(3)
		chai.expect(currentPosition.direction).equal(RobotDirection.SOUTH)
	})

	it("Should throw exception in placing robot outside dimension", function () {
		// Arrange
		const robot = new Robot(5, 5)
		const initialPosition: RobotPosition = {
			coordinate: {
				x: 8,
				y: 3,
			},
			direction: RobotDirection.SOUTH,
		}

		// Act
		// Assert
		chai.expect(() => robot.place(initialPosition)).to.throw(`initial position x need to be within [0,5)`)
	})

	it("Should move 1 step", function () {
		// Arrange
		const robot = new Robot(5, 5)
		const initialPosition: RobotPosition = {
			coordinate: {
				x: 1,
				y: 3,
			},
			direction: RobotDirection.NORTH,
		}

		// Act
		robot.place(initialPosition)
		robot.move()
		const result = robot.getCurrentPosition()
		// Assert
		chai.expect(result.direction).equal(RobotDirection.NORTH)
		chai.expect(result.coordinate.x).equal(1)
		chai.expect(result.coordinate.y).equal(4)
	})

	it("Should not move since the robot is on the fringe, y axis", function () {
		// Arrange
		const robot = new Robot(5, 5)
		const initialPosition: RobotPosition = {
			coordinate: {
				x: 2,
				y: 4,
			},
			direction: RobotDirection.NORTH,
		}

		// Act
		robot.place(initialPosition)
		robot.move()
		const result = robot.getCurrentPosition()
		// Assert
		chai.expect(result.direction).equal(RobotDirection.NORTH)
		chai.expect(result.coordinate.x).equal(2)
		chai.expect(result.coordinate.y).equal(4)
	})

	it("Should not move since the robot is on the fringe, x axis", function () {
		// Arrange
		const robot = new Robot(5, 5)
		const initialPosition: RobotPosition = {
			coordinate: {
				x: 4,
				y: 2,
			},
			direction: RobotDirection.EAST,
		}

		// Act
		robot.place(initialPosition)
		robot.move()
		const result = robot.getCurrentPosition()
		// Assert
		chai.expect(result.direction).equal(RobotDirection.EAST)
		chai.expect(result.coordinate.x).equal(4)
		chai.expect(result.coordinate.y).equal(2)
	})

	it("Should rotate left", function () {
		// Arrange
		const robot = new Robot(5, 5)
		const initialPosition: RobotPosition = {
			coordinate: {
				x: 4,
				y: 2,
			},
			direction: RobotDirection.EAST,
		}

		// Act
		robot.place(initialPosition)
		robot.rotate(RobotRotation.LEFT)
		const result = robot.getCurrentPosition()
		// Assert
		chai.expect(result.coordinate.x).equal(4)
		chai.expect(result.coordinate.y).equal(2)
		chai.expect(result.direction).equal(RobotDirection.NORTH)
	})

	it("Should rotate right", function () {
		// Arrange
		const robot = new Robot(5, 5)
		const initialPosition: RobotPosition = {
			coordinate: {
				x: 4,
				y: 2,
			},
			direction: RobotDirection.EAST,
		}

		// Act
		robot.place(initialPosition)
		robot.rotate(RobotRotation.RIGHT)
		const result = robot.getCurrentPosition()
		// Assert
		chai.expect(result.coordinate.x).equal(4)
		chai.expect(result.coordinate.y).equal(2)
		chai.expect(result.direction).equal(RobotDirection.SOUTH)
	})
})
