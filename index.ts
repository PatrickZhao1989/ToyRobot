import chalk from "chalk"
import inquirer from "inquirer"
import { Robot } from "./src/core/robot"
import { Command, RobotDirection, RobotPosition, RobotRotation } from "./src/models"
import { CONSTANTS } from "./src/crosscutting/index"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirerPrompt = require("inquirer-prompt-suggest")

inquirer.registerPrompt("suggest", inquirerPrompt)

console.log("Hello world")
const robot = new Robot(CONSTANTS.BOARDDIMENSIONS.WIDTH, CONSTANTS.BOARDDIMENSIONS.LENGTH)
const initialQuestion = [
	{
		type: "suggest",
		name: "command",
		message: "Please place your robot on the table:",
		suggestions: ["PLACE 0,0,NORTH"],
		validate: function (input: string) {
			if (input.split(" ")[0] !== "PLACE" || input.split(" ").length !== 2) {
				return "Please enter a valid command. The first command should be PLACE command. e.g. PLACE 0,0,NORTH"
			}
			const placeCommand = input.split(" ")
			const placeElements = placeCommand[1].split(",")

			const initialPosition: RobotPosition = {
				coordinate: {
					x: parseInt(placeElements[0]),
					y: parseInt(placeElements[1]),
				},
				direction: RobotDirection[placeElements[2] as keyof typeof RobotDirection],
			}

			robot.place(initialPosition)
			console.log(chalk.blueBright(robot.report()))
			return true
		},
	},
]

const validCommands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"]
const subsequentQuestions = [
	{
		type: "suggest",
		name: "command",
		message: "Please enter your next command:",
		suggestions: validCommands,
		validate: function (input: string) {
			const userCommand = input.split(" ")[0]
			if (!validCommands.includes(userCommand)) {
				return `Please enter a valid command (${validCommands.join(", ")})`
			}

			try {
				switch (userCommand) {
					case Command.PLACE:
						// table.place(table.getRobot()).at(input.split(" ")[1])
						// console.log(chalk.redBright(`Place ${input.split(" ")}`))
						break
					case Command.MOVE:
						robot.move()
						console.log(chalk.blueBright(robot.report()))
						break
					case Command.LEFT:
						robot.rotate(RobotRotation.LEFT)
						console.log(chalk.blueBright(robot.report()))
						break
					case Command.RIGHT:
						robot.rotate(RobotRotation.RIGHT)
						console.log(chalk.blueBright(robot.report()))
						break
					case Command.REPORT:
						console.log(chalk.blueBright(robot.report()))
						break
				}
			} catch (error: any) {
				return console.error(chalk.redBright(error.message))
			}

			return true
		},
	},
	{
		type: "confirm",
		name: "askAgain",
		message: "Do you want to continue again?",
		default: true,
	},
]

const initialPrompt = () => {
	inquirer.prompt(initialQuestion).then(() => {
		subsequentPrompts()
	})
}

const subsequentPrompts = () => {
	inquirer.prompt(subsequentQuestions).then((response) => {
		if (response.askAgain) {
			subsequentPrompts()
		}
	})
}

console.log(chalk.cyanBright("Toy Robot Simulator"))

console.log(chalk.blue("Example of valid commands that you could enter:\nPLACE 2,3,NORTH\nLEFT\nRIGHT\nMOVE\nREPORT\n"))

initialPrompt()
