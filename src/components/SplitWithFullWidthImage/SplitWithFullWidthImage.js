import React from 'react';
import classNames from 'classnames';

const SplitWithFullWidthImage = ({
  splitSectionImage,
  children,
  id,
  className,
}) => {
  if (!splitSectionImage || !children) return <></>;
  return (
    <section id={id} className={classNames('section', className)}>
      <div
        className="wrapper-two-split"
        style={{
          background: `linear-gradient(177.9deg, #0E111B 0%, rgba(14, 17, 27, 0.61) 27.24%), linear-gradient(0deg, rgba(14, 17, 27, 0.21), rgba(14, 17, 27, 0.21)),  url(${splitSectionImage.publicURL})`,
        }}
      >
        <div
          style={{ backgroundImage: `url(${splitSectionImage.publicURL})` }}
          className="bg-image"
        />
        <>{children}</>
      </div>
    </section>
  );
};

export default SplitWithFullWidthImage;
