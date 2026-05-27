const homePhotoFiles = [
  "WhatsApp Image 2026-05-27 at 16.58.22.jpeg",
  "WhatsApp Image 2026-05-27 at 16.58.57.jpeg",
  "WhatsApp Image 2026-05-27 at 16.59.23.jpeg",
  "WhatsApp Image 2026-05-27 at 17.01.08.jpeg"
];

const slideshowPhotoFiles = [
  "WhatsApp Image 2026-05-27 at 17.16.37 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.40.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.35.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.39 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.34.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.37 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.41 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.39 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.35 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.33.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.41 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.41 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.40 (4).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.36 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.36.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.38.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.36 (4).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.37 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 16.59.23.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.35 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.31.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.38 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.34 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.38 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.01.08.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.42 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.36 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.33 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.42.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.40 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.38 (4).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.34 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.39.jpeg",
  "WhatsApp Image 2026-05-27 at 16.58.22.jpeg",
  "WhatsApp Image 2026-05-27 at 16.58.57.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.32 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.35 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.32 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.42 (1).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.37.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.43.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.40 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.32.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.41.jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.32 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.33 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.40 (3).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.39 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.38 (2).jpeg",
  "WhatsApp Image 2026-05-27 at 17.16.36 (1).jpeg"
];

const homeTilts = [-7, 5, -3, 8];
const slideshowTilts = [-7, 5, -3, 8, -5, 4];

function buildPhoto(src, index, tilt) {
  return {
    id: `photo-${String(index + 1).padStart(2, "0")}`,
    src: `/assets/photos/${src}`,
    alt: `Foto ricordo ${index + 1}`,
    caption: "",
    tilt
  };
}

export const homePhotos = homePhotoFiles.map((src, index) =>
  buildPhoto(src, index, homeTilts[index % homeTilts.length])
);

export const photos = slideshowPhotoFiles.map((src, index) =>
  buildPhoto(src, index, slideshowTilts[index % slideshowTilts.length])
);

export const homePolaroids = homePhotos.map((photo) => ({
  id: photo.id,
  src: photo.src,
  alt: photo.alt,
  caption: "",
  rotation: photo.tilt
}));

export const slideshowPhotos = photos.map((photo) => ({
  id: photo.id,
  src: photo.src,
  alt: photo.alt,
  caption: "",
  rotation: photo.tilt
}));
