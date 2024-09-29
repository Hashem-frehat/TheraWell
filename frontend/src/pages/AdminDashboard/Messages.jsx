import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import { EnvelopeIcon, UserCircleIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid"; // Updated for Heroicons v2

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/messages/admin");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Handle message send
  const handleSendMessage = async (email) => {
    try {
      await axios.post(`http://localhost:5000/api/messages/admin/${email}/send`, {
        messageContent: reply,
      });

      // SweetAlert for success
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4F46E5", // Indigo color for the button
      });

      setReply("");
      setSelectedEmail("");
    } catch (error) {
      console.error("Error sending message:", error);

      // SweetAlert for failure
      Swal.fire({
        title: "Error!",
        text: "Failed to send the message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#E53E3E", // Red color for the button
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-indigo-700">Messages</h1>
      {messages.map((message) => (
        <div key={message.id} className="bg-white shadow-md p-4 rounded-md mb-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <UserCircleIcon className="h-6 w-6 text-indigo-700 mr-2" />
            <h2 className="text-xl font-semibold text-indigo-700">Message from: {message.name}</h2>
          </div>
          <p className="flex items-center">
            <EnvelopeIcon className="h-5 w-5 text-indigo-700 mr-1" />
            Email: {message.email}
          </p>
          <p className="flex items-center">
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-indigo-700 mr-1" />
            Subject: {message.subject || "No Subject"}
          </p>
          <p>Message: {message.message}</p>
          <p className="text-sm text-gray-600">Sent at: {new Date(message.created_at).toLocaleString()}</p>

          <textarea
            className="w-full p-2 border border-indigo-300 rounded-md mt-2 "
            placeholder="Type your reply here..."
            value={selectedEmail === message.email ? reply : ""}
            onChange={(e) => {
              setSelectedEmail(message.email);
              setReply(e.target.value);
            }}
          ></textarea>
          <button
            className="bg-indigo-700 text-white px-4 py-2 rounded-md mt-2 hover:bg-indigo-800 transition-colors"
            onClick={() => handleSendMessage(message.email)}
          >
            Send Reply
          </button>
        </div>
      ))}
    </div>
  );
};

export default Messages;
