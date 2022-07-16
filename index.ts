import chalk from "chalk"
import inquirer from "inquirer"
import { Command } from "./src/models"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirerPrompt = require("inquirer-prompt-suggest")

inquirer.registerPrompt("suggest", inquirerPrompt)

console.log("Hello world")
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
			// table.addRobot(robot).at(input.split(" ")[1])
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
						console.log(chalk.redBright(`Place ${input.split(" ")}`))
						break
					case Command.MOVE:
						//table.getRobot().move()
						console.log(chalk.redBright(`MOVE`))
						break
					case Command.LEFT:
						// table.getRobot().rotate(RobotRotation.LEFT)
						console.log(chalk.redBright(`LEFT`))
						break
					case Command.RIGHT:
						// table.getRobot().rotate(RobotRotation.RIGHT)
						console.log(chalk.redBright(`RIGHT`))
						break
					case Command.REPORT:
						//Logger.success(`Current position: ${table.getRobot().report()}`)
						console.log(chalk.redBright(`REPORT`))
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

console.log(chalk.blue("Example of valid commannds that you could enter:\nPLACE 2,3,W\nLEFT\nRIGHT\nMOVE\nREPORT\n"))

initialPrompt()
