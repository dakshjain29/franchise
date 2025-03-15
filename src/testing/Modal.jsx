import React, { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Blur effect when modal is open */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-all"></div>
      )}

      {/* Button to Open Modal */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md z-10"
      >
        Open Form
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded mb-3"
            />
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
