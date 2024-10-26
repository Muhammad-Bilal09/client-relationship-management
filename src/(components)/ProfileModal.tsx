import React from "react";
import { Dialog } from "@headlessui/react";
import { ProfileModalProps } from "@/types/type";

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  newName,
  setNewName,
  onSave,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <Dialog.Title className="text-xl font-semibold mb-4">
          Edit Profile
        </Dialog.Title>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onSave}
            className="bg-green text-white px-6 py-2 rounded-lg hover:bg-green-400"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default ProfileModal;
