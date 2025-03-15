import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">H-care</h2>
      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Register patient
      </button>
      <nav className="mt-4">
        <ul>
          <li className="mb-2">
            <a href="#" className="text-purple-500 hover:text-purple-700">
              Patients
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-purple-500 hover:text-purple-700">
              Overview
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-purple-500 hover:text-purple-700">
              Map
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-purple-500 hover:text-purple-700">
              Departments
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-purple-500 hover:text-purple-700">
              Doctors
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-purple-500 hover:text-purple-700">
              History
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-purple-500 hover:text-purple-700">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
