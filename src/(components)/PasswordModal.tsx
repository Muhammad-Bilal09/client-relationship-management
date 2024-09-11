import React from 'react';
import { Dialog } from '@headlessui/react';
import { PasswordModalProps } from '@/types/type';

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  currentPassword,
  newPassword,
  setCurrentPassword,
  setNewPassword,
  onSave
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <Dialog.Title className="text-xl font-semibold mb-4">Change Password</Dialog.Title>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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

export default PasswordModal;
