import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Button from '../components/Button';
import NonStretchedImage from '../components/NonStretchedImage';
import Content, { HTMLContent } from '../components/Content';
import SectionWith3Col from '../components/SectionWith3Col';
import CollapsibleWithImage from '../components/CollapsibleWithImage';
import TextWithExternalCTA from '../components/TextWithExternalCTA';
import FeaturesList from '../components/FeaturesList';

const EmptyComponent = () => <></>;

export const ProductPageTemplate = ({
  content,
  contentComponent,
  title,
  featuredimage,
  heading,
  subheading,
  featuredData,
  expandableBoxes,
  furtherInformationData,
  ctaSection,
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
        buttonText="Report interest"
        buttonPath="/products/bluethink-go/interested/"
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
      <CollapsibleWithImage
        collapsibleItems={expandableBoxes.boxes}
        className="has-dark-background is-medium"
      >
        <NonStretchedImage
          fluid={expandableBoxes.featuredimage.childImageSharp.fluid}
          objectFit="contain"
        />
      </CollapsibleWithImage>
      <SectionWith3Col
        className="has-dark-background has-text-left section"
        heading={featuredData.heading}
        description={featuredData.description}
        columns={featuredData.featuredDataBoxes}
        position="left"
      />
      <section
        id="btgo-page-content"
        className="section has-dark-background free-text-centered"
      >
        <div className="container">
          <PostContent content={content} />
        </div>
      </section>
      <section
        id="bt-iot-bridge-button"
        className="section has-dark-background has-text-centered"
      >
        <Button
          className="is-primary"
          text={ctaSection.cta.text}
          path={ctaSection.cta.path}
        />
      </section>
    </>
  );
};

ProductPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

const ProductPage = ({ data }) => {
  if (!data.index || !data.index.frontmatter) return EmptyComponent;
  const { frontmatter, html } = data.index;

  const {
    title,
    featuredimage,
    heading,
    subheading,
    featuredData,
    expandableBoxes,
    furtherInformationData,
    ctaSection,
    // customerQuotes,
  } = frontmatter;
  return (
    <Layout>
      <ProductPageTemplate
        content={html}
        contentComponent={HTMLContent}
        title={title}
        heading={heading}
        subheading={subheading}
        featuredimage={featuredimage}
        featuredData={featuredData}
        expandableBoxes={expandableBoxes}
        furtherInformationData={furtherInformationData}
        ctaSection={ctaSection}
        // customerQuotes={customerQuotes}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const pageQuery = graphql`
  query ProductPageTertiary($id: String!) {
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
          description
          featuredDataBoxes {
            icon {
              extension
              publicURL
            }
            heading
            description
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
        ctaSection {
          cta {
            text
            path
          }
        }
      }
    }
  }
`;
