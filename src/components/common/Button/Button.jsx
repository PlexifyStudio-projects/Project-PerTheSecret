const Button = ({ children, variant = 'primary', size, href, className = '', arrow, ...props }) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {children}
      {arrow && <span className="btn__arrow">&rarr;</span>}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
