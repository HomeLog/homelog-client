interface Profile {
  nickname: string;
  profileImageUrl: string;
  homeImageUrl: string;
  guestBookName: string;
}

export interface ProfileImagesProps {
  profile?: Profile;
  onProfileImageChange: (
    file: File | null,
    isProfileImageChanged: boolean,
  ) => void;
  onHomeImageChange: (file: File | null, isHomeImageChanged: boolean) => void;
}
