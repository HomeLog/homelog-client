import Button from './Button';

interface ModalProps {
  clickModal: () => void;
  setBasicImage: () => void;
  selectImage: () => void;
  isProfileImage: boolean;
}

const Modal: React.FC<ModalProps> = ({
  clickModal,
  setBasicImage,
  selectImage,
  isProfileImage,
}) => {
  return (
    <div className='absolute w-full h-full bg-gray-500/50' onClick={clickModal}>
      <div
        onClick={clickModal}
        className='fixed bg-white rounded-md transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 '
      >
        <div className='font-bold w-full px-5 py-4 h-14'>
          {isProfileImage ? '프로필' : '홈'} 사진 설정
        </div>
        <Button
          onClick={setBasicImage}
          className='bg-inherit rounded-none text-black text-base text-left'
        >
          기본 이미지 적용
        </Button>
        <Button
          onClick={selectImage}
          className='bg-inherit rounded-none rounded-b-md text-black text-base text-left'
        >
          앨범에서 사진 선택
        </Button>
      </div>
    </div>
  );
};

export default Modal;
