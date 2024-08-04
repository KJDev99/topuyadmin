// components/Modal.js
import React from "react";

const ModalStatus = ({ isOpen, onClose, onConfirm, actionType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {actionType === "activate" ? "Aktiv qilish" : "Noaktiv qilish"}{" "}
          tasdiqlang
        </h2>
        <p className="mb-4">
          Siz haqiqatan ham ushbu e'lonni{" "}
          {actionType === "activate" ? "aktiv" : "noaktiv"} qilmoqchimisiz?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Ha
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Yo'q
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalStatus;
