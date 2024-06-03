import Grid from '@/components/Grid';
import ButtonContainer from '../_containers/ButtonContainer';
import ImageUploadContainer from './_container/ImageUploadContainer';
import VisitorNameInput from './_container/VisitorNameInputContainer';

function NewGuestBookLink() {
  const { visitor, imageUrl } = {
    visitor: '박상희',
    imageUrl: '/images/example.jpg',
  };

  return (
    <Grid className='grid-rows-12 min-h-dvh'>
      <VisitorNameInput placeholder='방문자 이름을 입력해주세요' />
      <ImageUploadContainer />
      <ButtonContainer
        buttonText='링크 생성하기'
        className='justify-start row-start-11'
      />
    </Grid>
  );
}

export default NewGuestBookLink;
