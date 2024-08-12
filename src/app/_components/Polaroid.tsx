import { runtimeEnvConfig } from '@/config';
import { DGuestBook } from '@/types/guestbook.type';
import Image from 'next/image';
import Link from 'next/link';

function Polaroid(guestbook: DGuestBook) {
  const baseURL =
    window?.ENV?.NEXT_PUBLIC_API_IMAGE_SERVER_URL! ??
    runtimeEnvConfig.NEXT_PUBLIC_API_IMAGE_SERVER_URL;

  const thumbnail = guestbook?.imageKey
    ? `${baseURL}/w320/${guestbook.imageKey}`
    : '/images/background.png';

  const link = `/guest-book/${guestbook.id}`;

  return (
    <div className='relative w-[90%] aspect-2/3 drop-shadow-md rounded-sm overflow-hidden p-0 mx-auto mb-5'>
      <Link href={link}>
        <Image
          src={thumbnail}
          alt='guestbook thumbnail'
          fill
          style={{ objectFit: 'cover' }}
        />
      </Link>
    </div>
  );
}

export default Polaroid;
