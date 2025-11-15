import React, { useState } from "react"; // Sửa: import useState đúng cách
import Navbar from "../components/Navbar";
import Dock from "../components/Dock";
import DateTimePicker from "react-datetime-picker";
import toast from "react-hot-toast";
import api from "../lib/axios";

// THÊM VÀO: Bạn sẽ cần CSS cho picker để nó hiển thị đúng
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useNavigate } from "react-router-dom";

const CreatEvent = () => {
  const navigator = useNavigate();
  const [eventName, setEventName] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date()); // Thêm state cho EndTime
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      EventID: 1,
      RoomID: room,
      EventName: eventName,
      TimeStart: startTime,
      TimeEnd: endTime,
      Note: note,
    };
    setLoading(true);
    try {
      await api.post("/events", {
        EventID: 1,
        RoomID: room,
        EventName: eventName,
        TimeStart: startTime,
        TimeEnd: endTime,
        Note: note,
      });
      toast.success("Note created successfully");
      navigator("/");
    } catch (error) {
      console.log("Error creating note:", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
    console.log("Submitting Event:", newEvent);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-base-200 items-center">
      <Navbar />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">New Event</legend>

          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter name..."
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <label className="label">Room</label>
          <input
            type="text"
            className="input"
            placeholder="Enter your room..."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <label className="label">Start time</label>
          {/* SỬA: Bỏ input text, dùng Picker và state 'startTime' */}
          <DateTimePicker onChange={setStartTime} value={startTime} />

          <label className="label">End time</label>
          {/* SỬA: Bỏ input text, dùng Picker và state 'endTime' */}
          <DateTimePicker onChange={setEndTime} value={endTime} />

          <label className="label">Note</label>
          <input
            type="text"
            className="input"
            placeholder="Enter note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </fieldset>
        <input type="submit" value="Submit" className="btn btn-success" />
      </form>
      <Dock />
    </div>
  );
};

export default CreatEvent;
