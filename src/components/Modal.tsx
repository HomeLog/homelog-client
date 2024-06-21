import Button from './Button';

interface ModalProps {
  clickModal: () => void;
  setBasicImage: () => void;
  selectImage: () => void;
}

const Modal: React.FC<ModalProps> = ({
  clickModal,
  setBasicImage,
  selectImage,
}) => {
  return (
    <div onClick={clickModal} className='bg-white rounded-sm'>
      <div className='text-bold'>사진 설정</div>
      <Button onClick={setBasicImage}>기본 이미지 적용</Button>
      <Button onClick={selectImage}>앨범에서 사진 선택</Button>
    </div>
  );
};

export default Modal;
