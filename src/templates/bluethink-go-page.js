import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import NonStretchedImage from '../components/NonStretchedImage';
import RecentArticles from '../components/RecentArticles';
import Content, { HTMLContent } from '../components/Content';
import SectionWith3Col from '../components/SectionWith3Col';
import SplitWithImage from '../components/SplitWithImage';
import CollapsibleWithImage from '../components/CollapsibleWithImage';
import TextWithExternalCTA from '../components/TextWithExternalCTA';
import FeaturesList from '../components/FeaturesList';
import norwayMap from '../img/norway-domain.png';
import Button from '../components/Button';

const EmptyComponent = () => <></>;

export const BluethinkGOTemplate = ({
  content,
  contentComponent,
  title,
  featuredimage,
  heading,
  subheading,
  featuredData,
  responsiveDesignSection,
  expandableBoxes,
  furtherInformationData,
  // customerQuotes,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <SEO title={title} />
      <Hero
        heading={heading}
        subheading={subheading}
        gatsbyImageObject={featuredimage}
        buttonText="Meld interesse"
        buttonPath="/bluethink-go/meld-interesse"
        heroId="btgo-hero"
      >
        <NonStretchedImage
          fluid={featuredimage.childImageSharp.fluid}
          objectFit="contain"
        />
      </Hero>
      <section id="btgo-features" className="section has-dark-background">
        <div className="container">
          <div className="columns">
            <div className="column is-5">
              <TextWithExternalCTA
                heading={furtherInformationData.heading}
                description={furtherInformationData.description}
                buttonUrl={furtherInformationData.cta.url}
                buttonText={furtherInformationData.cta.text}
              />
            </div>
            <div id="features-column" className="column is-6 is-offset-1">
              <FeaturesList features={furtherInformationData.dataBoxes} />
            </div>
          </div>
        </div>
      </section>
      <SplitWithImage
        heading={responsiveDesignSection.heading}
        description={responsiveDesignSection.description}
        buttonText={responsiveDesignSection.cta.text}
        buttonPath={responsiveDesignSection.cta.path}
        className="has-dark-background is-medium"
      >
        <NonStretchedImage
          fluid={responsiveDesignSection.featuredimage.childImageSharp.fluid}
          objectFit="contain"
        />
      </SplitWithImage>
      <CollapsibleWithImage
        collapsibleItems={expandableBoxes.boxes}
        className="has-dark-background is-medium"
      >
        <NonStretchedImage
          fluid={expandableBoxes.featuredimage.childImageSharp.fluid}
          objectFit="contain"
        />
      </CollapsibleWithImage>
      <section id="domains" className="section has-dark-background">
        <div className="container">
          <div className="columns">
            <div className="column is-6">
              <figure className="image">
                <img src={norwayMap} alt="Kart over Norge" />
              </figure>
            </div>
            <div className="column is-5 text">
              <h3>BlueThink™ GO med skreddersydd domene for din lokalitet</h3>
              <p className="medium-paragraph">
                Vi har allerede kjøpt et skreddersydd domene til ditt anlegg og
                over 1000 andre oppdrettsanlegg i Norge. Domenenavnet er dermed
                enkelt å huske, slik at du kan logge deg inn når som helst, fra
                hvor som helst.
              </p>
              <Button
                className="is-transparent"
                text="Se fullstendig domeneliste"
                link="/bluethink-go/domener"
              />
            </div>
          </div>
        </div>
      </section>
      <SectionWith3Col
        className="has-dark-background"
        heading={featuredData.heading}
        columns={featuredData.featuredDataBoxes}
      />
      <section
        id="btgo-page-content"
        className="section has-dark-background free-text-centered"
      >
        <div className="container">
          <PostContent content={content} />
        </div>
      </section>
    </>
  );
};

BluethinkGOTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

const BluethinkGOPage = ({ data }) => {
  if (!data.index || !data.index.frontmatter) return EmptyComponent;
  const { frontmatter, html } = data.index;

  const {
    title,
    featuredimage,
    heading,
    subheading,
    featuredData,
    responsiveDesignSection,
    expandableBoxes,
    furtherInformationData,
    // customerQuotes,
  } = frontmatter;
  return (
    <Layout>
      <BluethinkGOTemplate
        content={html}
        contentComponent={HTMLContent}
        title={title}
        heading={heading}
        subheading={subheading}
        featuredimage={featuredimage}
        featuredData={featuredData}
        responsiveDesignSection={responsiveDesignSection}
        expandableBoxes={expandableBoxes}
        furtherInformationData={furtherInformationData}
        // customerQuotes={customerQuotes}
      />
      <RecentArticles />
    </Layout>
  );
};

BluethinkGOPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default BluethinkGOPage;

export const BluethinkGOPageQuery = graphql`
  query BluethinkGOPage($id: String!) {
    index: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        featuredimage {
          childImageSharp {
            fluid(maxHeight: 2000, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
          }
        }
        heading
        subheading

        featuredData {
          heading
          featuredDataBoxes {
            icon {
              extension
              publicURL
            }
            heading
            description
          }
        }
        responsiveDesignSection {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
          heading
          description
          cta {
            path
            text
          }
        }
        expandableBoxes {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
          boxes {
            heading
            description
          }
        }
        furtherInformationData {
          heading
          description
          cta {
            url
            text
          }
          dataBoxes {
            heading
            icon {
              extension
              publicURL
            }
          }
        }
      }
    }
  }
`;
