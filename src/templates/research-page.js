import React from 'react';

import { graphql } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import generateHTML from '../utils/generateHTML';
import SplittedSection from '../components/SplittedSection';
import Button from '../components/Button';
import NonStretchedImage from '../components/NonStretchedImage';

const ImageGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2fr 1fr;
  .image-item:first-of-type {
    grid-column: 1 / span 2;
    grid-row: 1;
  }
  .image-item:nth-of-type(2) {
    grid-column: 1;
    grid-row: 2;
  }
  .image-item:nth-of-type(3) {
    grid-column: 2;
    grid-row: 2;
  }
  .image-item {
    .image {
      height: 100% !important;
      width: 100% !important;
    }
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .image-item:first-of-type {
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
    }
    .image-item:nth-of-type(2) {
      grid-column: 3;
      grid-row: 1;
    }
    .image-item:nth-of-type(3) {
      grid-column: 3;
      grid-row: 2;
    }
  }
`;

const ImageGridStairs = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding-top: 60px;
  .image-item .image {
    min-height: 440px;
  }
  @media only screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr;
    .image-item:first-of-type {
      grid-column: 1 / span 2;
      grid-row: 1;
    }
    .image-item:nth-of-type(2) {
      grid-column: 1;
      grid-row: 2;
    }
    .image-item:nth-of-type(3) {
      grid-column: 2;
      grid-row: 2;
    }
    .image-item {
      .image {
        height: 100% !important;
        width: 100% !important;
      }
    }
  }
  @media only screen and (min-width: 960px) {
    .image-item:nth-of-type(2) {
      margin-top: 60px;
    }
    .image-item:nth-of-type(3) {
      margin-top: 120px;
    }
  }
`;

const CareersList = styled.ul`
  li {
    padding: 16px 0;
    font-size: 22px;
    font-weight: 600 !important;
    color: white !important;
    line-height: 350%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`;

const FreeText = styled.section`
  p strong {
    color: #dbe0ea !important;
    font-size: 32px !important;
  }
`;

const ButtonFlex = styled.div`
  .button {
    margin-top: 20px;
  }
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 200px));
    grid-gap: 12px;
  }
`;

export const ResearchPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredimages,
  centeredSection,
  careers,
  splitSection,
  backgroundSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="section has-dark-background">
        <div className="container">
          <ImageGrid>
            {featuredimages.map(imageItem => (
              <div className="image-item">
                <NonStretchedImage
                  objectFit="contain"
                  alt=""
                  className="image"
                  {...imageItem.image}
                />
              </div>
            ))}
          </ImageGrid>
        </div>
      </section>
      <section className="section has-dark-background">
        <div className="container has-text-centered content centered-free-text">
          <PostContent
            content={generateHTML(centeredSection.content)}
            className="content "
          />
          <Button
            className="is-primary"
            text={centeredSection.button.text}
            path={centeredSection.button.path}
          />
        </div>
        <ImageGridStairs>
          {centeredSection.images.map(imageItem => (
            <div className="image-item">
              <NonStretchedImage
                objectFit="contain"
                alt=""
                className="image"
                {...imageItem.image}
              />
            </div>
          ))}
        </ImageGridStairs>
      </section>
      <SplittedSection
        leftColumn={
          <>
            <p className="subheading">{careers.subheading}</p>
            <h2>{careers.heading}</h2>
            <PostContent
              content={generateHTML(careers.left)}
              className="content "
            />
            <ButtonFlex>
              {careers.buttons.map(buttonObject => (
                <Button
                  className="is-transparent"
                  text={buttonObject.text}
                  path={buttonObject.path}
                />
              ))}
            </ButtonFlex>
          </>
        }
        rightColumn={
          <>
            <p>
              <strong>{careers.positions.heading}</strong>
            </p>
            <CareersList>
              {careers.positions.items.map(positionText => (
                <li>{positionText}</li>
              ))}
            </CareersList>
          </>
        }
        className="section has-dark-background"
      />
      <FreeText className="section has-dark-background">
        <div className="container content centered-free-text">
          <PostContent content={content} className="content " />
        </div>
      </FreeText>
      <SplittedSection
        leftColumn={
          <PostContent
            content={generateHTML(splitSection.left)}
            className="content "
          />
        }
        leftColumnCSS=""
        rightColumn={
          <NonStretchedImage
            objectFit="contain"
            fluid={splitSection.featuredimage.childImageSharp.fluid}
            alt=""
            className="image"
          />
        }
        rightColumnCSS="centered"
        className="section has-dark-background"
        shouldReorderOnMobile
      />
      <BackgroundImage
        image={backgroundSection.bgimage}
        className="has-dark-background background-section"
        filterStyle={{ background: 'rgba(0, 0, 0, 0.4', display: 'flex' }}
        htmlTag="section"
      >
        <div className="section is-large content centered">
          <h2>{backgroundSection.heading}</h2>
          <PostContent
            content={generateHTML(backgroundSection.description)}
            className="content"
          />
        </div>
      </BackgroundImage>
    </>
  );
};

const ResearchPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimages,
    centeredSection,
    careers,
    splitSection,
    backgroundSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ResearchPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimages={featuredimages}
        centeredSection={centeredSection}
        careers={careers}
        splitSection={splitSection}
        backgroundSection={backgroundSection}
      />
    </Layout>
  );
};

export default ResearchPage;

export const pageQuery = graphql`
  query ResearchPageTemplateById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        description
        seoDescription
        featuredimages {
          image {
            childImageSharp {
              fluid(maxWidth: 900, quality: 80) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        centeredSection {
          button {
            path
            text
          }
          content
          images {
            image {
              childImageSharp {
                fluid(maxWidth: 900, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
          }
        }
        careers {
          buttons {
            path
            text
          }
          heading
          subheading
          left
          positions {
            heading
            items
          }
        }
        splitSection {
          left
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 650, quality: 80) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        backgroundSection {
          heading
          description
          bgimage {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 70) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
