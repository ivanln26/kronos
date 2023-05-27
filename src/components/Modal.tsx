import { Dispatch, SetStateAction } from "react";

interface ModalProps {
  isOpen: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function Modal({ isOpen, setModal, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center h-full">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={() => {setModal(false)}}
          />
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all ">
          {/* max-w-lg w-full*/}
          {children}
        </div>
      </div>
    </div>
  );
}
