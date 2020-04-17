import React from 'react';
import { graphql } from 'gatsby';

import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/HeroBackgroundImage';

import generateHTML from '../utils/generateHTML';
import NonStretchedImage from '../components/NonStretchedImage';
import HighlightedData from '../components/HighlightedData';
import Button from '../components/Button';
import SplittedSection from '../components/SplittedSection';
import productBackgroundImage from '../img/product-background-frontpage.png';
import { ButtonFlexCentered } from '../styles';

const FrontPage = styled.section`
  h1,
  h2 {
    font-weight: bold !important;
  }
  .camera-section {
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
  .success-factors {
    font-size: 18px;
    h1,
    h2 {
      max-width: 700px;
      margin: 0 auto;
    }
    .button {
      margin: 3rem 0;
    }
    @media screen and (min-width: 768px) {
      h1,
      h2 {
        font-size: 56px;
      }
    }
  }
  .tv-channel {
    padding-top: 6rem;
    .content {
      max-width: 520px;
    }
  }
  .quote {
    .content {
      max-width: 650px;
    }
    p#author {
      font-size: 14px;
      font-weight: bold;
      color: white;
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
    p,
    .image {
      margin: auto 0;
    }
    .image {
      max-height: 40px;
      margin-right: 25px;
    }
  }
  @media screen and (min-width: 768px) {
    margin-top: 5rem;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;

const SuccessFactors = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 16px 20px;
  padding-top: 1rem;
  text-align: center;
  .centered {
    width: 100%;
    height: 90px;
    p {
      color: white;
      margin: auto;
      padding: 1rem;
      line-height: 120%;
    }
  }
`;

export const IndexPageTemplate = ({
  heading,
  bgimage,
  facts,
  centeredSection,
  productSection,
  successFactors,
  splitSection,
  partnering,
  quoteSection,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content;
  console.log(partnering);

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
        className="section is-large has-dark-background camera-section"
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
      <BackgroundImage
        image={successFactors.bgimage}
        id
        style
        filterStyle={{ background: 'rgba(0, 0, 0, 0.4)' }}
        htmlTag="div"
      >
        <section className="section is-large success-factors">
          <div className="container centered">
            {successFactors.subheading ? (
              <p className="subheading">{successFactors.subheading}</p>
            ) : (
              <></>
            )}
            <PostContent
              className="highlighted large"
              content={generateHTML(successFactors.content)}
            />
            <Button
              className="is-primary small"
              text={successFactors.button.text}
              path={successFactors.button.path}
            />
          </div>
          <div className="container">
            <SuccessFactors>
              {successFactors.features.map(textItem => (
                <div className="centered border-top-bottom">
                  <p className="bold paragraph">{textItem.text}</p>
                </div>
              ))}
            </SuccessFactors>
          </div>
        </section>
      </BackgroundImage>
      <SplittedSection
        className="section is-medium has-dark-background tv-channel"
        shouldReorderOnMobile
        leftColumn={
          <>
            <PostContent
              className="content"
              content={generateHTML(splitSection.content)}
            />
            <Button
              className="is-primary"
              text={splitSection.button.text}
              path={splitSection.button.path}
            />
          </>
        }
        rightColumn={
          <NonStretchedImage
            fluid={splitSection.featuredimage.childImageSharp.fluid}
            objectFit="contain"
            alt={splitSection.heading}
            className="image"
          />
        }
      />
      <BackgroundImage
        image={partnering.bgimage}
        id
        style
        filterStyle={{ background: 'rgba(0, 0, 0, 0.4)' }}
        htmlTag="div"
      >
        <section className="section is-large success-factors">
          <div className="container centered">
            {partnering.subheading ? (
              <p className="subheading">{partnering.subheading}</p>
            ) : (
              <></>
            )}
            <PostContent
              className="highlighted large"
              content={generateHTML(partnering.content)}
            />
            {partnering.buttons.length > 0 ? (
              <ButtonFlexCentered>
                {partnering.buttons.map(buttonItem => (
                  <Button
                    className="is-secondary small"
                    text={buttonItem.text}
                    path={buttonItem.path}
                  />
                ))}
              </ButtonFlexCentered>
            ) : (
              <></>
            )}
          </div>
        </section>
      </BackgroundImage>
      <section className="section has-dark-background is-medium quote">
        <div className="container">
          <PostContent
            className="content"
            content={generateHTML(quoteSection.content)}
          />
          <Button
            className="is-secondary small"
            text={quoteSection.button.text}
            path={quoteSection.button.path}
          />
        </div>
      </section>
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
    successFactors,
    splitSection,
    partnering,
    quoteSection,
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
        successFactors={successFactors}
        splitSection={splitSection}
        partnering={partnering}
        quoteSection={quoteSection}
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
              fluid(maxHeight: 1180, quality: 80) {
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
        successFactors {
          content
          subheading
          button {
            text
            path
          }
          features {
            text
          }
          bgimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 80) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        splitSection {
          content
          subheading
          button {
            text
            path
          }
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 700, quality: 80) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
        partnering {
          content
          subheading
          buttons {
            text
            path
          }
          bgimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 80) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        quoteSection {
          content
          button {
            text
            path
          }
        }
      }
    }
  }
`;
