import useScrollReveal from '../../../hooks/useScrollReveal';

const SectionHeader = ({ label, title, text, light = false }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`section-header ${light ? 'section-header--light' : ''} ${isVisible ? 'is-visible' : ''}`}
    >
      {label && (
        <span className="section-header__label">
          <span />
          {label}
          <span />
        </span>
      )}
      <h2 className={`section-header__title ${isVisible ? 'is-visible' : ''}`}>
        {title}
      </h2>
      {text && <p className="section-header__text">{text}</p>}
    </div>
  );
};

export default SectionHeader;
