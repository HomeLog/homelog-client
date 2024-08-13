export type Heic2anyOptions = {
  blob: Blob;
  toType?: string;
  quality?: number;
  multiple?: boolean;
};

export type Heic2anyFunction = (
  options: Heic2anyOptions,
) => Promise<Blob | Blob[]>;
