import TImageFile from '@/types/image.file';

const PAPER_IMAGE_PATH = '/images/paper.jpg';
const FONT_PATHS = {
  normal: '/fonts/E1234/E1234.ttf',
  italic: '/fonts/E1234/E1234-Italic.ttf',
};

async function urlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

async function loadFonts(): Promise<void> {
  const fontPromises = [
    new FontFace('E1234', `url(${FONT_PATHS.normal})`).load(),
    new FontFace('E1234-Italic', `url(${FONT_PATHS.italic})`).load(),
  ];

  try {
    const loadedFonts = await Promise.all(fontPromises);
    loadedFonts.forEach((font) => document.fonts.add(font));
  } catch (error) {
    console.warn('Failed to load custom fonts. Using fallback fonts.', error);
  }
}

async function cropImageTo4by3Ratio(imageFile: File): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(imageFile);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Unable to get canvas context');
      }

      let width, height;
      const aspectRatio = 3 / 4;
      if (img.width / img.height > aspectRatio) {
        height = img.height;
        width = height * aspectRatio;
      } else {
        width = img.width;
        height = width / aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      const startX = (img.width - width) / 2;
      const startY = (img.height - height) / 2;
      ctx.drawImage(img, startX, startY, width, height, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        },
        'image/png',
        1,
      );
    } catch (error) {
      reject(error);
    }
  });
}

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
  ctx.save();

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

  shadowLayers.forEach((layer) => {
    ctx.shadowColor = layer.color;
    ctx.shadowBlur = layer.blur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillText(date, x + width - paddingRight, y + height - paddingBottom);
  });

  ctx.shadowColor = 'transparent';
  ctx.fillText(date, x + width - paddingRight, y + height - paddingBottom);

  ctx.restore();
}

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

  // Fixed: Use a type assertion to handle the possibility of roundRect not being available
  if ((ctx as any).roundRect) {
    ctx.beginPath();
    (ctx as any).roundRect(dx, dy, dWidth, dHeight, borderRadius);
    ctx.clip();
  } else {
    ctx.beginPath();
    ctx.moveTo(dx + borderRadius, dy);
    ctx.arcTo(dx + dWidth, dy, dx + dWidth, dy + dHeight, borderRadius);
    ctx.arcTo(dx + dWidth, dy + dHeight, dx, dy + dHeight, borderRadius);
    ctx.arcTo(dx, dy + dHeight, dx, dy, borderRadius);
    ctx.arcTo(dx, dy, dx + dWidth, dy, borderRadius);
    ctx.closePath();
    ctx.clip();
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

  ctx.restore();
}

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target || typeof event.target.result !== 'string') {
        reject(new Error('Failed to read file'));
        return;
      }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

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
  if (!ctx) throw new Error('Unable to get canvas context');

  const bgImgRatio = 2 / 3;
  let width, height;
  if (bgImage.width / bgImage.height > bgImgRatio) {
    height = bgImage.height;
    width = height * bgImgRatio;
  } else {
    width = bgImage.width;
    height = width / bgImgRatio;
  }

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

  const horizontalPadding = canvas.width * 0.05;
  const imageWidth = canvas.width - horizontalPadding * 2;
  const imageHeight = (4 * imageWidth) / 3;
  const paddingTop = canvas.height * 0.087;
  const paddingLeft = canvas.width * 0.05;

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

  const fontSize = Math.floor(canvas.height * 0.03);
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

  // Fixed: Return a Blob instead of canvas
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create blob from canvas'));
      }
    }, 'image/png');
  });
}

export const convertFileToImageFile = async (
  file: File,
): Promise<Omit<TImageFile, 'date'>> => {
  try {
    await loadFonts();
  } catch (error) {
    console.warn('Failed to load custom font. Using fallback font.', error);
  }

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
        throw new Error('Conversion failed: Result is not a Blob');
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

  try {
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

    const createdImageFile = await createImageFile(combinedImageFile);
    return createdImageFile;
  } catch (error) {
    throw error;
  }
};

async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function createImageFile(file: File): Promise<Omit<TImageFile, 'date'>> {
  const dataURL = await readFileAsDataURL(file);
  return {
    file,
    previewUrl: dataURL,
  };
}
