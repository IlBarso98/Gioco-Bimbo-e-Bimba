const floatingIcons = [
  { icon: '♥', top: '10%', left: '5%', fontSize: '1.2rem', animationDelay: '0s' },
  { icon: '✦', top: '20%', right: '8%', fontSize: '1rem', animationDelay: '0.8s' },
  { icon: '♥', top: '54%', left: '3%', fontSize: '1rem', animationDelay: '1.4s' },
  { icon: '✦', top: '66%', right: '6%', fontSize: '1.1rem', animationDelay: '2.1s' },
  { icon: '♥', top: '82%', left: '18%', fontSize: '1.4rem', animationDelay: '2.8s' },
  { icon: '✦', top: '88%', right: '20%', fontSize: '0.95rem', animationDelay: '1.7s' },
];

function FloatingIcons() {
  return (
    <div className="floating-icons" aria-hidden="true">
      {floatingIcons.map((item, index) => (
        <span
          key={`${item.icon}-${index}`}
          className="floating-icon"
          style={item}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}

export default FloatingIcons;
