"use client";

import { X, AlertTriangle } from "lucide-react"; // 'X' is now used

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4'>
        {/* ADDED: Close button with the 'X' icon */}
        <button
          onClick={onClose}
          className='absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-100'
        >
          <X className='h-6 w-6' />
        </button>
        <div className='flex items-start'>
          <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
            <AlertTriangle
              className='h-6 w-6 text-red-600'
              aria-hidden='true'
            />
          </div>
          <div className='ml-4 text-left'>
            <h3
              className='text-lg leading-6 font-medium text-gray-900'
              id='modal-title'
            >
              {title}
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>{message}</p>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
          <button
            type='button'
            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            type='button'
            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
