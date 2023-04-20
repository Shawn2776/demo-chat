import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function Home() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  let allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.KEY, {
      cluster: process.env.CLUSTER,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  });

  return (
    <>
      <Head>
        <link
          href="https://js.pusher.com/7.2/pusher.min.js"
          rel="stylesheet"
        ></link>
      </Head>
      <main className="px-10 py-10">
        <div>
          <input
            value={username}
            placeholder="Username"
            className="text-black"
            onChange={(e) => setUsername(e.target.value)}
          />
          <hr />
          {messages.localeCompare((message, id) => {
            return (
              <div key={id}>
                {message.username} | {message.message}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
