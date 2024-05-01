input.onButtonPressed(Button.A, function () {
    black_Line_L = pins.analogReadPin(AnalogPin.P0)
    black_Line_R = pins.analogReadPin(AnalogPin.P2)
    serial.writeLine("black_line_L_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P0)" + "," + "black_line_R_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P2)")
    serial.writeLine("" + black_Line_L + "," + black_Line_R)
})
input.onGesture(Gesture.LogoUp, function () {
    motobit.enable(MotorPower.Off)
})
input.onGesture(Gesture.ScreenUp, function () {
    motobit.enable(MotorPower.On)
})
input.onGesture(Gesture.ScreenDown, function () {
    motobit.enable(MotorPower.Off)
})
input.onButtonPressed(Button.B, function () {
    while (true) {
        current_surface_reading_L = pins.analogReadPin(AnalogPin.P0)
        current_surface_reading_R = pins.analogReadPin(AnalogPin.P2)
        serial.writeLine("" + current_surface_reading_L + "," + current_surface_reading_R)
        motobit.enable(MotorPower.On)
        if (current_surface_reading_L >= black_Line_L - 100 && current_surface_reading_R >= black_Line_R - 100) {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 50)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 50)
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
            basic.pause(10)
        } else if (current_surface_reading_L >= black_Line_L - 100) {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 50)
            basic.showLeds(`
                # # # . .
                # # . . .
                # . # . .
                . . # . .
                . . # . .
                `)
            basic.pause(10)
        } else if (current_surface_reading_R >= black_Line_R - 100) {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 50 + 5)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
            basic.showLeds(`
                . . # # #
                . . . # #
                . . # . #
                . . # . .
                . . # . .
                `)
            basic.pause(10)
            move_left = 0
        } else {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 30)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 30)
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
            basic.pause(15)
            if (move_left < 3) {
                motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
                motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 50 + move_left * 10)
                basic.showLeds(`
                    # # # . .
                    # # . . .
                    # . # . .
                    . . # . .
                    . . # . .
                    `)
                basic.pause(10)
                move_left = move_left + 1
            } else {
                motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 50)
                motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
                basic.showLeds(`
                    . . # # #
                    . . . # #
                    . . # . #
                    . . # . .
                    . . # . .
                    `)
                basic.pause(10)
                move_left = 0
            }
        }
        motobit.enable(MotorPower.Off)
    }
})
input.onGesture(Gesture.ThreeG, function () {
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 100)
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 100)
})
let move_left = 0
let current_surface_reading_R = 0
let current_surface_reading_L = 0
let black_Line_R = 0
let black_Line_L = 0
serial.redirectToUSB()
motobit.invert(Motor.Left, false)
motobit.invert(Motor.Right, true)
motobit.enable(MotorPower.Off)
black_Line_L = pins.analogReadPin(AnalogPin.P0)
black_Line_R = pins.analogReadPin(AnalogPin.P2)
serial.writeLine("black_line_L_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P0)" + "," + "black_line_R_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P2)")
serial.writeLine("" + black_Line_L + "," + black_Line_R)
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
