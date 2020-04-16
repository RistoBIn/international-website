import React from 'react';
import { graphql } from 'gatsby';

import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/HeroBackgroundImage';

import NonStretchedImage from '../components/NonStretchedImage';
import HighlightedData from '../components/HighlightedData';
import QuotesList from '../components/QuotesList';
import SplitWithFullWidthImage from '../components/SplitWithFullWidthImage';
import Button from '../components/Button';
import SplittedSection from '../components/SplittedSection';
import productBackgroundImage from '../img/product-background-frontpage.png';

const FrontPage = styled.section`
  .camera-section {
    padding-top: 4rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    .product-image {
      background-image: url(${productBackgroundImage});
      background-size: 120%;
      background-repeat: no-repeat;
      background-position: center;
      padding: 0 50px;
      @media screen and (min-width: 1200px) {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        padding: 0 100px;
      }
    }
    @media screen and (max-width: 768px) {
      padding-top: 5rem;
    }
  }
`;

const ProductFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 2rem;
  .feature-item {
    margin-top: 30px;
    display: flex;
    .image {
      max-height: 40px;
      margin-right: 25px;
    }
  }
  @media screen and (min-width: 768px) {
    margin-top: 5rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

export const IndexPageTemplate = ({
  heading,
  bgimage,
  facts,
  centeredSection,
  productSection,
  quotes,
  splitSectionImage,
  content,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <FrontPage>
      <Hero
        className="is-fullheight front-page"
        heading={heading}
        subheading=""
        backgroundImage={bgimage}
        buttonText="Learn more"
        anchorLink="#facts"
        backgroundCSS="linear-gradient(177.9deg, #0E111B 8.35%, rgba(14, 17, 27, 0.21) 27.24%), linear-gradient(0deg, rgba(14, 17, 27, 0.21), rgba(14, 17, 27, 0.21)), linear-gradient(180deg, rgba(4, 5, 10, 0) 49.95%, #0E111B 100%)"
      />
      <section className="section has-dark-background">
        <div className="container centered">
          <Title
            title={centeredSection.heading}
            description={centeredSection.description}
            subheading={centeredSection.subheading}
            position="center"
          />
          <Button
            className="is-secondary"
            text={centeredSection.button.text}
            path={centeredSection.button.path}
          />
        </div>
      </section>
      <HighlightedData highlighted={facts} id="facts" />
      <SplittedSection
        className="section is-medium has-dark-background camera-section"
        shouldReorderOnMobile
        leftColumn={
          <>
            <Title
              title={productSection.heading}
              description={productSection.description}
              position="left"
            />
            <Button
              className="is-secondary"
              text="Read more"
              path="/products/edge-intelligence"
            />
            {productSection.features && productSection.features.length > 0 ? (
              <ProductFeatures>
                {productSection.features.map(featureItem => (
                  <div className="feature-item">
                    <NonStretchedImage
                      objectFit="contain"
                      alt={featureItem.heading}
                      className="image"
                      {...featureItem.icon}
                    />
                    <p>{featureItem.heading}</p>
                  </div>
                ))}
              </ProductFeatures>
            ) : (
              <></>
            )}
          </>
        }
        rightColumn={
          <div className="product-image">
            <NonStretchedImage
              fluid={productSection.featuredimage.childImageSharp.fluid}
              objectFit="contain"
              alt={productSection.heading}
              className="image"
            />
          </div>
        }
      />
      <BackgroundImage image className id children style filterStyle htmlTag />
      {/* 
      <QuotesList quotes={quotes} className="section has-dark-background" /> */}
    </FrontPage>
  );
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    bgimage,
    items,
    centeredSection,
    productSection,
  } = frontmatter;

  return (
    <Layout seoDescription={seoDescription} seoTitle={title}>
      <IndexPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        bgimage={bgimage}
        facts={items}
        centeredSection={centeredSection}
        productSection={productSection}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      id
      html
      frontmatter {
        title
        heading
        seoDescription
        bgimage {
          publicURL
          extension
          childImageSharp {
            fluid(maxHeight: 920, quality: 80) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }

        items {
          keyNumber
          keyNumberBefore
          keyNumberAfter
          description
        }

        centeredSection {
          subheading
          heading
          description
          button {
            text
            path
          }
        }

        productSection {
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
          features {
            heading
            icon {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 90, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`;
