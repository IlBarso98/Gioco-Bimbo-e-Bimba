import { useEffect, useState } from "react";

function PlaceholderMedia({
  src,
  alt,
  className = "",
  aspectRatio = "4 / 5",
  preserveSize = false,
  label = "Aggiungi qui una foto speciale"
}) {
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  if (hasError) {
    return (
      <div
        aria-label={alt}
        className={`media-placeholder ${className}`.trim()}
        role="img"
        style={preserveSize ? undefined : { aspectRatio }}
      >
        <span>{label}</span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
      src={src}
      style={preserveSize ? undefined : { aspectRatio }}
    />
  );
}

export default PlaceholderMedia;
