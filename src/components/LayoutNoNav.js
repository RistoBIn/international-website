import React from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import Footer from './Footer';
import './all.scss';
import useSiteMetadata from './SiteMetadata';

const TemplateWrapper = ({ children, seoTitle, seoDescription }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{seoTitle || title}</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/config/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/config/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/config/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/config/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta name="description" content={seoDescription || description} />
        <meta property="og:url" content="https://sealab.no" />
        <meta property="og:title" content={seoTitle || title} />
        <meta
          property="og:description"
          content={seoDescription || description}
        />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/config/og-image.jpg`}
        />
      </Helmet>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
