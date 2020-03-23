import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import LayoutNoNav from '../components/LayoutNoNav';
import Hero from '../components/HeroVideo';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Button from '../components/Button';
import RecentArticles from '../components/RecentArticles';
import fishVideoMP4 from '../videos/fishVideo.mp4';
import fishVideoWebM from '../videos/fishVideo.webm';
import DNLogo from '../img/Logos/Mentioned/Default/DN-Logo.png';
import OpdalingenLogofrom from '../img/Logos/Mentioned/Default/opdalingen-logo.png';
import TULogo from '../img/Logos/Mentioned/Default/tu.no-logo.png';
import ILaksLogo from '../img/Logos/Mentioned/Default/ilaksno-logo.png';
import KystNoLogo from '../img/Logos/Mentioned/Default/kystno-logo.png';
import BorderedContentSection from '../components/BorderedContentSection';
import BorderedBoxes from '../components/BorderedBoxes';
import QuoteSection from '../components/QuoteSection';

import NonStretchedImage from '../components/NonStretchedImage';

export const IndexPageTemplate = ({
  heading,
  subheading,
  threeColumns,
  news,
  largeImageSection,
  centeredSection,
  partnership,
  quote,
}) => (
  <section className="has-dark-background">
    <Hero
      title={heading}
      subtitle={subheading}
      Navbar={Navbar}
      callToActionLink="/kontakt"
      callToActionText="Kontakt oss"
      secondaryCallToActionLink="/bluethink"
      secondaryCallToActionText="Les mer"
      backgroundVideoMP4={fishVideoMP4}
      backgroundVideoWebM={fishVideoWebM}
    />
    <BorderedContentSection
      sectionHeading={news.sectionHeading}
      heading={news.heading}
      subheading={news.subheading}
      description={news.description}
      fluidImage={news.featuredimage.childImageSharp.fluid}
    />
    <section id="product" className="has-dark-background">
      <div className="container">
        <section id="machineVision" className="section is-medium">
          <div className="columns">
            <div className="column is-6 is-offset-3 has-text-centered">
              <Title
                title={threeColumns.heading}
                subtitle={threeColumns.subheading}
                description={threeColumns.description}
                position="center"
              />
            </div>
          </div>
          <div id="machineIcons" className="columns">
            {threeColumns.columns.map(iconColumn => {
              const { icon } = iconColumn;

              return (
                <div className="column is-4">
                  <figure className="image">
                    <img src={icon.publicURL} alt={icon} />
                  </figure>
                  <h4>{iconColumn.heading}</h4>
                  <p>{iconColumn.description}</p>
                  <Button
                    className="is-transparent small"
                    text="Les mer"
                    link={iconColumn.buttonPath}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section id="livestream" className="section is-small">
          <NonStretchedImage
            fluid={largeImageSection.featuredimage.childImageSharp.fluid}
            objectFit="contain"
            alt={largeImageSection.subheading}
            className="image"
          />
          <div className="columns">
            <div className="column is-4">
              <Title
                title={largeImageSection.heading}
                subtitle={largeImageSection.subheading}
                position="left"
              />
            </div>
            <div className="column is-7 is-offset-1">
              <p>{largeImageSection.description}</p>
              <Button
                className="is-secondary"
                text="Les mer"
                link={largeImageSection.callToActionPath}
              />
            </div>
          </div>
        </section>
        <section id="published" className="section is-medium">
          <h3 className="has-text-centered">
            Hvem har publisert vår historie?
          </h3>
          <div className="columns has-text-centered">
            <MentionedInLogo img={DNLogo} />
            <MentionedInLogo img={OpdalingenLogofrom} />
            <MentionedInLogo img={TULogo} />
            <MentionedInLogo img={ILaksLogo} />
            <MentionedInLogo img={KystNoLogo} />
          </div>
        </section>
        <section id="tablet" className="section is-small">
          <div className="columns">
            <div className="column is-6 is-offset-3 has-text-centered">
              <Title
                title={centeredSection.heading}
                subtitle={centeredSection.subheading}
                description={centeredSection.description}
                position="center"
              />
              <div className="columns">
                <div className="column">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-transparent medium"
                    href="http://sealab.live/"
                  >
                    Se demo
                  </a>
                </div>
                <div className="column">
                  <Button
                    className="is-primary medium"
                    text="Les mer"
                    link={centeredSection.callToActionPath}
                  />
                </div>
              </div>
            </div>
          </div>
          <NonStretchedImage
            fluid={centeredSection.featuredimage.childImageSharp.fluid}
            objectFit="contain"
            alt={centeredSection.subheading}
            className="image"
          />
        </section>
        <BorderedBoxes
          heading={partnership.heading}
          subheading={partnership.subheading}
          description={partnership.description}
          boxes={partnership.companies}
        />
      </div>
    </section>
    <QuoteSection quote={quote.description} author={quote.author} />
  </section>
);

const MentionedInLogo = ({ img }) => (
  <div className="column is-2" style={{ margin: 'auto' }}>
    <figure className="image">
      <img
        style={{ height: '35px', width: 'auto', margin: 'auto' }}
        src={img}
        alt={img}
      />
    </figure>
  </div>
);

IndexPageTemplate.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <LayoutNoNav
      seoDescription={frontmatter.seoDescription}
      seoTitle={frontmatter.title}
    >
      <IndexPageTemplate
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        threeColumns={frontmatter.threeColumns}
        news={frontmatter.newsSection}
        largeImageSection={frontmatter.largeImageSection}
        centeredSection={frontmatter.centeredSection}
        partnership={frontmatter.partnership}
        quote={frontmatter.quote}
      />

      <RecentArticles />
    </LayoutNoNav>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        subheading
        seoDescription
        threeColumns {
          heading
          subheading
          description
          columns {
            heading
            description
            buttonPath
            icon {
              publicURL
            }
          }
        }
        newsSection {
          sectionHeading
          subheading
          heading
          description
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
        largeImageSection {
          subheading
          heading
          description
          callToActionPath
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
        centeredSection {
          subheading
          heading
          description
          callToActionPath
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
        partnership {
          subheading
          heading
          description
          companies {
            description
            image {
              childImageSharp {
                fluid(maxWidth: 210) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                }
              }
              publicURL
              extension
            }
          }
        }
        quote {
          description
          author
        }
      }
    }
  }
`;
