interface ModalProps {
  setModal: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal = ({ setModal, title, children }: ModalProps) => {
  const preventOffModal = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={setModal}
      className='absolute w-full h-full bg-gray-500/50 p-10'
    >
      <div
        onClick={preventOffModal}
        className='fixed bg-white rounded-md transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 px-2 py-5'
      >
        {title && (
          <div className='font-bold text-gray-400 w-full px-7 py-4'>
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
