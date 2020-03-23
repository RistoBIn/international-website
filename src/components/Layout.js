import React from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import Footer from './Footer';
import Navbar from './Navbar';
import './all.scss';
import useSiteMetadata from './SiteMetadata';

const TemplateWrapper = ({ children, articles, seoTitle, seoDescription }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="no" />
        <title>{seoTitle || title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta name="description" content={seoDescription || description} />
        <meta property="og:url" content="https://sealab.no" />
        <meta property="og:title" content={seoTitle || title} />
        <meta
          property="og:description"
          content={seoDescription || description}
        />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>

      <Navbar />
      <div>{children}</div>
      <Footer articles={articles} />
    </div>
  );
};

export default TemplateWrapper;
