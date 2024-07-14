interface Profile {
  nickname: string;
  avatarImageKey: string;
  homeImageKey: string;
  guestBookName: string;
}

export interface ProfileImagesProps {
  profile?: Profile;
  onAvatarImageChange: (
    file: File | null,
    isAvatarImageChanged: boolean,
  ) => void;
  onHomeImageChange: (file: File | null, isHomeImageChanged: boolean) => void;
}
