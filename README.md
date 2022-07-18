# ToyRobot
Toy Robot Project 
- Simulate a toy robot moving on a square tabletop, of dimensions X units x Y units. Parameterized X, Y as constants, to be changed to env file.
- There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction.
Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.
Handles exceptions but do not kill the program.
- All commands should be discarded until a valid place command has been executed.
- UI is done via CLI

# Commands
- PLACE X,Y,DIRECTION
    X and Y are integers that indicate a location on the tabletop.

    DIRECTION is a string indicating which direction the robot should face. It it one of the four cardinal directions: NORTH, EAST, SOUTH or WEST.
- MOVE
    Instructs the robot to move 1 square in the direction it is facing.
- LEFT
    Instructs the robot to rotate 90° anticlockwise/counterclockwise.
- RIGHT
    Instructs the robot to rotate 90° clockwise.
- REPORT
    Outputs the robot's current location on the tabletop and the direction it is facing.

# Prerequisite 
- [NodeJS](https://nodejs.org/en/) (Developed with) 16.14.2
- npm 8.5.0
# Get started
```shell
npm start
```
Follow the prompt information
# Test
- Run test 
```shell
npm test
```
- Generate test coverage report

// TODO Test coverage report to be fixed
```shell
npm run test:coverage
```
# TODO Deployment/Docker

```