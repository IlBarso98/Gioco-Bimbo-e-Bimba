import PlaceholderMedia from "./PlaceholderMedia";

function PolaroidPhoto({ photo, className = "" }) {
  return (
    <figure
      className={`polaroid ${className}`.trim()}
      style={{ "--rotation": `${photo.rotation ?? 0}deg` }}
    >
      <PlaceholderMedia
        alt={photo.alt}
        aspectRatio="4 / 5"
        className="polaroid-image"
        label="Aggiungi qui la vostra foto"
        src={photo.src}
      />
      {photo.caption ? <figcaption className="polaroid-caption">{photo.caption}</figcaption> : null}
    </figure>
  );
}

export default PolaroidPhoto;
