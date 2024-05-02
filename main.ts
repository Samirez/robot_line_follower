input.onButtonPressed(Button.A, function () {
    for (let i = 0; i <= 2; i++) {
        black_Line[i] = pins.analogReadPin(pinsArray[i])
    }
    serial.writeLine("" + (`black_line_L: ${black_Line[0]},
                    black_line_M: ${black_Line[1]},
                    black_line_R: ${black_Line[2]}`))
})
input.onButtonPressed(Button.B, function () {
    while (true) {
        for (let j = 0; j <= 2; j++) {
            current_surface_reading[j] = pins.analogReadPin(pinsArray[j])
        }
        serial.writeLine("" + (`${current_surface_reading[0]}, ${current_surface_reading[1]}, ${current_surface_reading[2]}`))
        motobit.enable(MotorPower.On)
        if (current_surface_reading[1] >= black_Line[1] - 100) {
            motobit.setMotorSpeed(Motor.Left, motorDirection[0], motorSpeed[0])
            motobit.setMotorSpeed(Motor.Right, motorDirection[0], motorSpeed[0])
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
            `)
        } else if (current_surface_reading[0] >= black_Line[0] - 100) {
            motobit.setMotorSpeed(Motor.Left, motorDirection[0], motorSpeed[1])
            motobit.setMotorSpeed(Motor.Right, motorDirection[0], motorSpeed[2])
            basic.showLeds(`
                # # # . .
                # # . . .
                # . # . .
                . . # . .
                . . # . .
            `)
        } else if (current_surface_reading[2] >= black_Line[2] - 100) {
            motobit.setMotorSpeed(Motor.Left, motorDirection[0], motorSpeed[2])
            motobit.setMotorSpeed(Motor.Right, motorDirection[0], motorSpeed[1])
            basic.showLeds(`
                . . # # #
                . . . # #
                . . # . #
                . . # . .
                . . # . .
            `)
        } else {
            motobit.setMotorSpeed(Motor.Left, motorDirection[1], motorSpeed[1])
            motobit.setMotorSpeed(Motor.Right, motorDirection[1], motorSpeed[1])
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
            `)
        }
        basic.pause(10)
    }
})
let current_surface_reading: number[] = []
let black_Line: number[] = []
black_Line = [0, 0, 0]
current_surface_reading = [0, 0, 0]
let pinsArray = [AnalogPin.P0, AnalogPin.P1, AnalogPin.P2]
let motorSpeed = [30, 20, 40]
let motorDirection = [MotorDirection.Forward, MotorDirection.Reverse]
serial.redirectToUSB()
motobit.invert(Motor.Left, false)
motobit.invert(Motor.Right, true)
motobit.enable(MotorPower.Off)
for (let k = 0; k <= 2; k++) {
    black_Line[k] = pins.analogReadPin(pinsArray[k])
}
serial.writeLine("" + (`black_line_L: ${black_Line[0]},
                black_line_M: ${black_Line[1]},
                black_line_R: ${black_Line[2]}`))
basic.showLeds(`
    . . . . .
    . . . . .
    # . . . .
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    # . . . .
    . # . . .
    # # # . .
    . # . . .
    # . . . .
    `)
basic.showLeds(`
    . . # . .
    . . . # .
    # # # # #
    . . . # .
    . . # . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . # #
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
