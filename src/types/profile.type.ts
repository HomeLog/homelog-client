interface Profile {
  nickname: string;
  profileImageUrl: string;
  homeImageUrl: string;
  guestBookName: string;
}

export interface ProfileImagesProps {
  profile?: Profile;
  onProfileImageChange: (file: File) => void;
  onHomeImageChange: (file: File) => void;
}
