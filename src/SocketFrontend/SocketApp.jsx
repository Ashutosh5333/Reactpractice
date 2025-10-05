import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const SocketApp = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [status, setStatus] = useState("🕓 Connecting...");
  const chatEndRef = useRef(null);

  // Scroll to bottom automatically
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Setup socket listeners
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      setStatus("🟢 Connected to server");
    });

    socket.on("disconnect", () => {
      setStatus("🔴 Disconnected. Retrying...");
    });

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
    };
  }, []);

  // Send message to backend
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  const myId = socket.id;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1rem",
            background: "#2563eb",
            color: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <h3>💬 Socket Chat</h3>
          <p style={{ fontSize: "0.9rem", margin: 0 }}>{status}</p>
        </div>

        {/* Chat Window */}
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {chat.map((msg, index) => {
            const isMine = msg.id === myId;
            const isServer = msg.id === "server";
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isServer
                    ? "center"
                    : isMine
                    ? "flex-end"
                    : "flex-start",
                }}
              >
                <div
                  style={{
                    background: isServer
                      ? "#e5e7eb"
                      : isMine
                      ? "#a7f3d0"
                      : "#f3f4f6",
                    color: "#111827",
                    padding: "0.5rem 1rem",
                    borderRadius: "10px",
                    maxWidth: "70%",
                    textAlign: isMine ? "right" : "left",
                  }}
                >
                  {!isServer && (
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#6b7280",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {isMine ? "You" : msg.id}
                    </div>
                  )}
                  <div>{msg.text}</div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div
          style={{
            padding: "0.8rem",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <input
            type="text"
            value={message}
            placeholder="Type your message..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flexGrow: 1,
              padding: "0.6rem",
              borderRadius: "20px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "0.6rem 1rem",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocketApp;
