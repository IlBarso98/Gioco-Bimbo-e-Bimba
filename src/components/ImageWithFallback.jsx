import { useEffect, useState } from 'react';
import { resolveAssetPath } from '../utils/assets';

function ImageWithFallback({
  src,
  alt,
  aspectRatio = '4 / 5',
  preserveSize = false,
  className = '',
  imageClassName = '',
  label = 'Foto in arrivo',
}) {
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className={`image-fallback ${className}`.trim()}
        style={preserveSize ? undefined : { aspectRatio }}
        role="img"
        aria-label={alt || label}
      >
        <span>{label}</span>
      </div>
    );
  }

  return (
    <img
      src={resolveAssetPath(src)}
      alt={alt}
      className={`${className} ${imageClassName}`.trim()}
      style={preserveSize ? undefined : { aspectRatio }}
      onError={() => setHasError(true)}
    />
  );
}

export default ImageWithFallback;
