import React from "react";

export default function Header() {
  return (
    <div className="bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-2"
          />
        </div>
        <div>
          <span className="mr-4">Emma Kwan</span>
          <div className="relative">
            <img
              src="user-avatar.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
