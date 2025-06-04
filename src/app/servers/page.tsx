"use client";

import React, { useState, useEffect } from "react";
import { FaHashtag, FaCog } from "react-icons/fa";

const ServersPage: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState("general");

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    General: true,
    "Voice Channels": true,
    Support: true,
    Events: true,
    Resources: true,
  });

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderChannel = (name: string) => (
    <div
      key={name}
      className={`flex items-center justify-between px-3 py-1 text-sm rounded-md cursor-pointer transition-all ${
        activeChannel === name
          ? "bg-[#2f3136] text-white"
          : "text-gray-400 hover:bg-[#2f3136] hover:text-white"
      }`}
      onClick={() => setActiveChannel(name)}
    >
      <span className="flex items-center gap-1">
        <FaHashtag size={12} />
        {name}
      </span>
      {activeChannel === name && <FaCog size={12} />}
    </div>
  );

  const messages = [
    {
      name: "Alice",
      seed: "Alice",
      color: "text-blue-400",
      message: "Hey everyone! Welcome to the IEEE CS Chapter server!",
      timestamp: "2025-06-03T18:00:00Z",
    },
    {
      name: "Bob",
      seed: "Bob",
      color: "text-green-400",
      message: "Glad to be here!",
      timestamp: "2025-06-03T18:05:00Z",
    },
    {
      name: "Alice",
      seed: "Alice2",
      color: "text-red-400",
      message:
        "Reminder: Our weekly meeting is today at 10 pm in the #chapter-meetings voice channel. See you there.",
      timestamp: "2025-06-03T18:10:00Z",
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex h-screen">
      {/* Server Icons Sidebar */}
      <div className="w-16 bg-black p-2 flex flex-col items-center overflow-hidden">
        <img
          src="/Frame_3724.png"
          alt="Server Icons"
          className="object-cover h-full w-full rounded-md"
        />
      </div>

      {/* Channels Sidebar */}
      <div className="w-72 h-screen overflow-y-scroll text-white px-4 py-6 space-y-4 border-r border-gray-800 bg-gradient-to-b from-black via-black to-[#0f172a] scrollbar scrollbar-thumb-white/90 scrollbar-track-[#1a1a1a]">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="/hackbattle.png"
            className="w-8 h-8 rounded-full"
            alt="server"
          />
          <h2 className="text-xl font-bold">Hackbattle</h2>
        </div>

        {/* Sections */}
        {[
          { title: "General", channels: ["general", "welcome"] },
          { title: "Voice Channels", channels: ["technical", "voice-general"] },
          { title: "Support", channels: ["tickets", "faq"] },
          { title: "Events", channels: ["upcoming", "chapter-meetings"] },
          { title: "Resources", channels: ["study-material", "project-repos"] },
        ].map((section, idx) => (
          <div key={idx}>
            <div
              className="flex justify-between items-center text-sm text-gray-400 mt-4 cursor-pointer"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              <button className="text-white text-lg">
                {expandedSections[section.title] ? "−" : "+"}
              </button>
            </div>
            {expandedSections[section.title] &&
              section.channels.map((channel) => renderChannel(channel))}
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 relative text-white p-6 overflow-y-auto bg-black bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.15)_0%,rgba(0,0,0,1)_85%)]">
        {/* Title with glow effect */}
        <h1 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)] [user-select:none]">
          Welcome to the server
        </h1>

        {/* Messages */}
        <div className="space-y-6 pb-36 [user-select:none]">
          {messages.map((msg, idx) => (
            <div className="flex items-start gap-4 select-none" key={idx}>
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${msg.seed}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${msg.color}`}>
                    {msg.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
                <p className="text-gray-200">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Input */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl">
          <div className="h-[1px] bg-white/10 mb-2" />
          <div className="bg-white/5 backdrop-blur-md rounded-2xl flex items-center p-3 ring-2 ring-white/10 shadow-lg">
            <button className="px-3 text-white text-xl">➕</button>
            <input
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 px-4"
              placeholder={`Message #${activeChannel}`}
            />
            <button className="px-3 text-gray-400 hover:text-white">GIF</button>
            <button className="px-3 text-gray-400 hover:text-white">😊</button>
          </div>
          <div className="h-[1px] bg-white/10 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default ServersPage;
