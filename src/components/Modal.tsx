import Button from './Button';

const buttonStyles = {
  intent: 'secondary' as 'secondary',
  size: 'md' as 'md',
  rounded: 'sm' as 'sm',
};

interface ModalProps {
  clickModal: () => void;
  setBasicImage: () => void;
  selectImage: () => void;
  isAvatarImage: boolean;
}

const Modal: React.FC<ModalProps> = ({
  clickModal,
  setBasicImage,
  selectImage,
  isAvatarImage,
}) => {
  return (
    <div
      className='absolute w-full h-full bg-gray-500/50 p-10'
      onClick={clickModal}
    >
      <div
        onClick={clickModal}
        className='fixed bg-white rounded-md transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 px-2 py-5'
      >
        <div className='font-bold text-gray-400 w-full px-7 py-4'>
          {isAvatarImage ? '프로필' : '홈'} 사진 설정
        </div>
        <Button onClick={setBasicImage} {...buttonStyles}>
          기본 이미지 적용
        </Button>
        <Button onClick={selectImage} {...buttonStyles}>
          앨범에서 사진 선택
        </Button>
      </div>
    </div>
  );
};

export default Modal;
