import React, {Component} from 'react'


class App extends Component {
    state = {
        seconds: 0,
        time: "00:00",
        timeInput: 10,
        numCompleted: "2",
        totalTime: "24",
        timerVal: "START"
    }
    interval:any

    handleStartPressed() {
        if (this.interval == null) {
            this.startTimer()
            this.setState({
                timerVal: "STOP"
            })
        } else {
            clearInterval(this.interval)
            this.interval = null
            this.setState({
                timerVal: "START"
            })
        }
    }

    handleTimeChange(evt:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        let buttonData = evt.currentTarget.name
        if (this.interval == null && buttonData !== 'custom') {
            this.setState({
                timeInput: [parseInt(buttonData)*60],
                time: [buttonData,":00"]
            })
        }
    }

    startTimer() {
        if (this.state.timeInput !== 0) {
            this.setState({
                seconds:this.state.timeInput
            }, () => {
                this.interval = setInterval(this.countDown.bind(this), 1000)
            })
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1

        this.setState({
            seconds: seconds,
            time: [this.secondsToTime(seconds)]
        })

        if (seconds === 0) {
            clearInterval(this.interval)
            this.interval = null
            this.setState({
                timerVal: "START"
            })
        }
    }

    secondsToTime(seconds:number) {
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        var time = ""

        if (hours === 0) {
            time = minutes + ":" + seconds
        } else {
            time = hours + ":" + minutes + ":" + seconds
        }
        return(time)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        this.interval = null
    }

    render() {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-bgDark font-rubik gap-y-28 text-white">
            <span className="text-4xl font-bold">Pomodoro!</span>
            <div className="flex flex-col items-center justify-center gap-y-10">
                <div className="w-425 h-300 bg-default rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-y-6 pt-7">
                    <div className="flex gap-x-5 text-lg w-full px-7">
                        <button onClick={evt => this.handleTimeChange(evt)} name="25" className="timerBtn">25m</button>
                        <button onClick={evt => this.handleTimeChange(evt)} name="10" className="timerBtn">10m</button>
                        <button onClick={evt => this.handleTimeChange(evt)} name="5" className="timerBtn">5m</button>
                        <button onClick={evt => this.handleTimeChange(evt)} name="custom" className="timerBtn">Custom</button>
                    </div>
                    <div>
                        <span className="text-7xl font-bold">{this.state.time}</span>
                        <input className="hidden"></input>
                    </div>
                    <div className="flex flex-col">
                        <button onClick={() => this.handleStartPressed()} className="bg-buttonWhite text-buttonText py-5 px-8 rounded-xl border-2 duration-150 transition-all border-buttonBorder z-10 font-bold transform hover:translate-y-2 active:translate-y-5 active:bg-default">{this.state.timerVal}</button>
                        <div className="bg-buttonBg h-14 rounded-xl border-2 border-buttonBorder z-5 transform -translate-y-10 font-bold text-buttonText"/>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5 items-center justify-center">
                    <span className="text-4xl font-bold">Pomodoros Completed: {this.state.numCompleted}</span>
                    <span className="text-4xl font-bold">Total Time: {this.state.totalTime}</span>
                </div>
            </div>
        </div>
      )
    }
};


export default App;