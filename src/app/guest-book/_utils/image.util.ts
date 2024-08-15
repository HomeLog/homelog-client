import TImageFile from '@/types/image.file';

const PAPER_IMAGE_PATH = '/images/paper.jpg';
const FONT_PATHS = {
  normal: '/fonts/E1234/E1234.ttf',
  italic: '/fonts/E1234/E1234-Italic.ttf',
};

// URL을 File 객체로 변환하는 함수
async function urlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

// 폰트를 로드하는 함수
async function loadFonts(): Promise<void> {
  const fontFaces = [
    new FontFace('E1234', `url(${FONT_PATHS.normal})`),
    new FontFace('E1234-Italic', `url(${FONT_PATHS.italic})`),
  ];

  try {
    const loadedFonts = await Promise.all(fontFaces.map((font) => font.load()));
    loadedFonts.forEach((font) => document.fonts.add(font));
  } catch (error) {
  }
}

// 이미지를 4:3 비율로 자르는 함수
async function cropImageTo4by3Ratio(imageFile: File): Promise<Blob> {
  const img = await loadImage(imageFile);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('캔버스 컨텍스트를 가져올 수 없습니다');

  const aspectRatio = 3 / 4;
  const { width, height } = calculateDimensions(
    img.width,
    img.height,
    aspectRatio,
  );

  canvas.width = width;
  canvas.height = height;

  const startX = (img.width - width) / 2;
  const startY = (img.height - height) / 2;
  ctx.drawImage(img, startX, startY, width, height, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error('캔버스를 Blob으로 변환하는데 실패했습니다')),
      'image/png',
      1,
    );
  });
}

// 주어진 종횡비에 맞는 너비와 높이를 계산하는 함수
function calculateDimensions(
  imgWidth: number,
  imgHeight: number,
  aspectRatio: number,
): { width: number; height: number } {
  let width, height;
  if (imgWidth / imgHeight > aspectRatio) {
    height = imgHeight;
    width = height * aspectRatio;
  } else {
    width = imgWidth;
    height = width / aspectRatio;
  }
  return { width, height };
}

// 스타일이 적용된 텍스트를 렌더링하는 함수
function renderStyledText(
  ctx: CanvasRenderingContext2D,
  date: string,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize: number,
  paddingBottom: number,
  paddingRight: number,
) {
  const fontFamily = '"E1234-Italic", "E1234", sans-serif';
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'rgba(255, 176, 97, 0.9)';

  const shadowLayers = [
    { color: 'rgba(253, 106, 1, 1)', blur: 2 },
    { color: 'rgba(128, 55, 0, 0.7)', blur: 4 },
    { color: 'rgba(64, 27, 0, 0.5)', blur: 5 },
    { color: 'rgba(0, 0, 0, 0.8)', blur: 8 },
  ];

  const textX = x + width - paddingRight;
  const textY = y + height - paddingBottom;

  shadowLayers.forEach(({ color, blur }) => {
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillText(date, textX, textY);
  });

  ctx.shadowColor = 'transparent';
  ctx.fillText(date, textX, textY);
}

// 둥근 모서리의 이미지를 그리는 함수
function drawRoundedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  sx: number,
  sy: number,
  sWidth: number,
  sHeight: number,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number,
  borderRadius: number,
) {
  ctx.save();
  ctx.beginPath();
  if ('roundRect' in ctx) {
    (ctx as any).roundRect(dx, dy, dWidth, dHeight, borderRadius);
  } else {
    drawFallbackRoundedRect(ctx, dx, dy, dWidth, dHeight, borderRadius);
  }
  ctx.clip();
  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  ctx.restore();
}

// roundRect 메서드가 없는 경우를 위한 대체 함수
function drawFallbackRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

// 이미지 파일을 로드하는 함수
const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target || typeof event.target.result !== 'string') {
        reject(new Error('파일 읽기 실패'));
        return;
      }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('이미지 로드 실패'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
};

// 이미지들을 합성하는 함수
async function combineImages(
  bgImg: File,
  fgCanvas: File,
  date: string,
): Promise<Blob> {
  const [bgImage, fgImage] = await Promise.all([
    loadImage(bgImg),
    loadImage(fgCanvas),
  ]);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('캔버스 컨텍스트를 가져올 수 없습니다');

  const bgImgRatio = 2 / 3;
  const { width, height } = calculateDimensions(
    bgImage.width,
    bgImage.height,
    bgImgRatio,
  );

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  const startX = (bgImage.width - width) / 2;
  const startY = (bgImage.height - height) / 2;

  drawRoundedImage(
    ctx,
    bgImage,
    startX,
    startY,
    width,
    height,
    0,
    0,
    width,
    height,
    10,
  );

  const horizontalPadding = width * 0.05;
  const imageWidth = width - horizontalPadding * 2;
  const imageHeight = (4 * imageWidth) / 3;
  const paddingTop = height * 0.087;
  const paddingLeft = width * 0.05;

  ctx.drawImage(
    fgImage,
    0,
    0,
    fgImage.width,
    fgImage.height,
    paddingLeft,
    paddingTop,
    imageWidth,
    imageHeight,
  );

  const fontSize = Math.floor(height * 0.03);
  renderStyledText(
    ctx,
    date,
    0,
    0,
    width,
    height,
    fontSize,
    Math.round(imageHeight * 0.16),
    Math.round(imageWidth * 0.085),
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error('캔버스에서 Blob 생성 실패')),
      'image/png',
    );
  });
}

// 파일을 이미지 파일로 변환하는 메인 함수
export const convertFileToImageFile = async (
  file: File,
): Promise<Omit<TImageFile, 'date'>> => {
  await loadFonts().catch(console.error);

  let convertedFile = file;
  if (file.type === 'image/heic' || file.type === 'image/heif') {
    try {
      const heic2any = await import('heic2any');
      const blob = await heic2any.default({
        blob: file,
        toType: 'image/jpeg',
        quality: 1,
      });
      if (!(blob instanceof Blob)) {
        throw new Error('변환 실패: 결과가 Blob이 아닙니다');
      }
      convertedFile = new File(
        [blob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        {
          type: 'image/jpeg',
          lastModified: file.lastModified,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  const croppedBlob = await cropImageTo4by3Ratio(convertedFile);
  const croppedFile = new File([croppedBlob], convertedFile.name, {
    type: 'image/jpeg',
    lastModified: convertedFile.lastModified,
  });

  const paperFile = await urlToFile(PAPER_IMAGE_PATH, 'paper.jpg');
  const combinedImageBlob = await combineImages(
    paperFile,
    croppedFile,
    new Date()
      .toLocaleDateString('ko-KR')
      .replace(/\./g, '')
      .replace(/ /g, '.'),
  );

  const combinedImageFile = new File([combinedImageBlob], file.name, {
    type: 'image/png',
    lastModified: file.lastModified,
  });

  return createImageFile(combinedImageFile);
};

// 파일을 DataURL로 읽는 함수
async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 이미지 파일을 생성하는 함수
async function createImageFile(file: File): Promise<Omit<TImageFile, 'date'>> {
  const dataURL = await readFileAsDataURL(file);
  return { file, previewUrl: dataURL };
}
