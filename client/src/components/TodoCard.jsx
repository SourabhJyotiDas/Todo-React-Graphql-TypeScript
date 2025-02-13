import React, { useState } from "react";
import { Link } from "react-router-dom";

const TodoCard = ({ title, description, date, _id }) => {
  const [status, setStatus] = useState("pending");

  return (
    <Link to={`/${_id}`}>
      <div className="cursor-pointer relative bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg w-72 transition-transform hover:scale-105">
        <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
        <p className="text-sm text-gray-300 mt-2">{description}</p>
        <p className="text-xs text-gray-400 mt-2">📅 {date}</p>

        {/* Status Radio Buttons */}
        <div className="mt-4 space-y-2">
          {["pending", "inprogress", "completed"].map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <div
                className={`w-4 h-4 rounded-full cursor-pointer transition ${
                  item === status ? "scale-125" : "opacity-50"
                } ${
                  item === "pending"
                    ? "bg-yellow-400"
                    : item === "inprogress"
                    ? "bg-blue-400"
                    : "bg-green-400"
                }`}
                onClick={() => setStatus(item)}></div>
              <span className="text-sm text-gray-300 capitalize">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default TodoCard;
