import { runtimeEnvConfig } from '@/config';
import { DGuestBook } from '@/types/guestbook.type';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Polaroid(guestbook: DGuestBook) {
  let thumbnail = '/images/background.png';
  const baseURL =
    window?.ENV?.NEXT_PUBLIC_API_IMAGE_SERVER_URL! ??
    runtimeEnvConfig.NEXT_PUBLIC_API_IMAGE_SERVER_URL;
  if (guestbook.imageKey) thumbnail = `${baseURL}/w320/${guestbook.imageKey}`;

  const link = `/guest-book/${guestbook.id}`;
  const router = useRouter();
  const redirectToGuestbookDetailPage = () => {
    router.push(link);
  };

  return (
    <div className='w-[90%] aspect-2/3 drop-shadow-md rounded-sm overflow-hidden p-0 mx-auto mb-5'>
      <Link href={link}>
        <Image
          src={thumbnail}
          alt='guestbook thumbnail'
          layout='fill'
          objectFit='cover'
        />
      </Link>
    </div>
  );
}

export default Polaroid;
