import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import useSound from "use-sound";

const App = () => {
	// Seconds left for internal use and display
	const seconds = useRef<number>(1500);
	const [display, setDisplay] = useState<string>("25:00");

	// Checking if the timer is active
	const [timerGoing, setTimerGoing] = useState<boolean>(false);
	// The intervalID; used to clear the timer
	const [intervalID, setIntervalID] = useState<any>();
	// Used to check whether to use custom input or not
	const [custom, setCustom] = useState(false);
	// Custom input manager
	const [inputText, setInputText] = useState("");

	// Cookies
	const [completedCookies, setCompletedCookie] = useCookies(["completed"]);
	const [totalCookies, setTotalCookie] = useCookies(["total"]);

	// Ringtone that is played on timer finish
	const [play] = useSound("https://jamiejcole.github.io/pomodoro/ringtone.mp3", { volume: 1 });

	// Handling the start button being pressed
	const handleStartPressed = () => {
		if (timerGoing === false && seconds.current > 1) {
			setCustom(false);
			setInputText("");
			setTimerGoing(true);
			countDown();
		} else if (timerGoing === true) {
			stopTimer();
		}
	};

	// Handles different times being chosen (25, 10, 5, custom)
	const handleTimeChange = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		let buttonData = evt.currentTarget.name;
		if (!timerGoing) {
			buttonData === "custom" ? setCustom(true) : setCustom(false);
			updateSeconds(parseInt(buttonData) * 60);
		}
	};

	// Handles custom time input, custom time can be in MM, MM:SS, or HH:MM:SS
	const handleCustomInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(evt.target.value);
		if (evt.target.value.length < 3) {
			updateSeconds(timeToSeconds("00:" + evt.target.value + ":00"));
		} else if (evt.target.value.length < 6) {
			updateSeconds(timeToSeconds("00:" + evt.target.value));
		} else {
			updateSeconds(timeToSeconds(evt.target.value));
		}
	};

	// Handles the actual countdown with an interval
	const countDown = () => {
		// Records total time for cookies
		const totalTime = seconds.current;

		const newInterval = setInterval(() => {
			updateSeconds(seconds.current - 1);

			// When timer finishes cleanup interval, play noise, and add cookies
			if (seconds.current === 0) {
				addCookies(totalTime);
				stopTimer();
				play();
			}
		}, 1000);

		setIntervalID(newInterval);
	};

	// Cleans up the interval timer
	const stopTimer = () => {
		clearInterval(intervalID);
		setTimerGoing(false);
	};

	// Adding the cookies which record total pomodoros and total time
	const addCookies = (total: number) => {
		const totalTime = parseInt(totalCookies.total) + total;
		setCompletedCookie("completed", parseInt(completedCookies.completed) + 1, { path: "/" });
		setTotalCookie("total", totalTime);
	};

	// updates the seconds ref and updates display state (so page rerenders)
	const updateSeconds = (newSeconds: number) => {
		seconds.current = newSeconds;
		setDisplay(secondsToTime(newSeconds));
	};

	// Converting seconds to HH:MM:SS
	const secondsToTime = (seconds: number) => {
		let hours: number = Math.floor(seconds / 3600);
		seconds %= 3600;
		let minutes: number = Math.floor(seconds / 60);
		seconds %= 60;

		var formattedHours: string;
		var formattedMinutes: string;
		var formattedSeconds: string;

		hours < 10 ? (formattedHours = "0" + hours) : (formattedHours = String(hours));
		minutes < 10 ? (formattedMinutes = "0" + minutes) : (formattedMinutes = String(minutes));
		seconds < 10 ? (formattedSeconds = "0" + seconds) : (formattedSeconds = String(seconds));

		var output: string;
		hours < 1 ? (output = formattedMinutes + ":" + formattedSeconds) : (output = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds);
		return output;
	};

	// Convert HH:MM:SS to seconds
	const timeToSeconds = (time: string) => {
		const [hh, mm, ss] = time.split(":");

		const seconds = parseInt(mm) * 60 + parseInt(hh) * 3600 + parseInt(ss);
		return seconds;
	};

	// Clearing interval when component is unmounted
	useEffect(() => {
		if (completedCookies.completed === undefined || totalCookies.total === undefined) {
			setCompletedCookie("completed", 0, { path: "/" });
			setTotalCookie("total", 0, { path: "/" });
		}
		return () => {
			stopTimer();
		}; //eslint-disable-next-line
	}, []);

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-between bg-bgDark font-rubik text-white">
			<span className="text-4xl font-bold flex text-center items-end h-1/5">Pomodoro!</span>
			<div className="flex flex-col items-center justify-center gap-y-10 w-full h-4/5">
				<div className="bg-default rounded-2xl shadow-2xl flex flex-col w-full max-w-md items-center justify-center gap-y-6 pt-7">
					<div className="flex gap-x-1 md:gap-x-5 text-lg w-full px-1 md:px-7">
						<button onClick={(evt) => handleTimeChange(evt)} name="25" className="timerBtn">
							25m
						</button>
						<button onClick={(evt) => handleTimeChange(evt)} name="10" className="timerBtn">
							10m
						</button>
						<button onClick={(evt) => handleTimeChange(evt)} name="5" className="timerBtn">
							5m
						</button>
						<button onClick={(evt) => handleTimeChange(evt)} name="custom" className="timerBtn">
							Custom
						</button>
					</div>
					<div className="h-1/3 flex-none">
						<span className={"text-7xl font-bold h-full " + (custom ? "hidden" : "block")}>{display}</span>
						<input
							className={"text-7xl font-bold text-white h-full focus:outline-none bg-transparent w-full text-center " + (custom ? "block" : "hidden")}
							placeholder="00:00"
							value={inputText}
							name="customInput"
							onChange={(evt) => handleCustomInput(evt)}
						/>
					</div>
					<div className="flex flex-col">
						<button
							onClick={() => handleStartPressed()}
							className="bg-buttonWhite text-buttonText py-5 px-8 rounded-xl border-2 duration-150 transition-all border-buttonBorder z-10 font-bold transform hover:translate-y-2 active:translate-y-5 active:bg-default"
						>
							{timerGoing ? "STOP" : "START"}
						</button>
						<div className="bg-buttonBg h-14 rounded-xl border-2 border-buttonBorder z-5 transform -translate-y-10 font-bold text-buttonText" />
					</div>
				</div>
				<div className="md:flex flex-col gap-y-5 items-center justify-center px-5 hidden">
					<span className="text-4xl font-bold text-center">Pomodoros Completed: {completedCookies.completed}</span>
					<span className="text-4xl font-bold text-center">Total Time: {secondsToTime(parseInt(totalCookies.total))}</span>
				</div>
			</div>
		</div>
	);
};

export default App;
