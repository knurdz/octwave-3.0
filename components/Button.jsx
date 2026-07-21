export default function Button({ children, variant = "primary", onClick, href, className = "" }) {
  const classes = `${variant === "outline" ? "btn-outline" : "btn-primary"} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
