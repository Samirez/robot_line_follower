input.onButtonPressed(Button.A, function () {
    black_line = pins.analogReadPin(AnalogPin.P1)
    serial.writeString("black_line_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P1=)")
    serial.writeLine("" + (black_line))
})
let current_surface_reading = 0
let black_line = 0
serial.redirectToUSB()
motobit.invert(Motor.Left, false)
motobit.invert(Motor.Right, true)
black_line = pins.analogReadPin(AnalogPin.P1)
serial.writeString("black_line_(i.e._Baseline_Value_of_Line_Following_Sensor_on_P1=)")
serial.writeLine("" + (black_line))
basic.forever(function () {
    current_surface_reading = pins.analogReadPin(AnalogPin.P1)
    serial.writeLine("" + (current_surface_reading))
    if (current_surface_reading < black_line - 800) {
        motobit.enable(MotorPower.On)
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 40)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 40)
        basic.showLeds(`
            . # . # .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)
        basic.pause(10)
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 30)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
        basic.showLeds(`
            # # # . .
            # # . . .
            # . # . .
            . . # . .
            . . # . .
            `)
        basic.pause(5)
        motobit.enable(MotorPower.Off)
    } else {
        motobit.enable(MotorPower.On)
        motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        basic.pause(5)
        motobit.enable(MotorPower.Off)
    }
})
