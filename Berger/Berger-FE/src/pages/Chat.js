import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { api_url } from "../helpers/api_url";

function Chat() {
	const [count, setCount] = useState(0);
	const updateUserCount = (num) => {
		setCount(num);
	};
	useEffect(() => {
		const socket = io(api_url);
		socket.on("JumlahUser", updateUserCount);
	}, []);
	return <div>{count}</div>;
}

export default Chat;
