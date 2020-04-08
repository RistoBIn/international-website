import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
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

const ButtonFlex = styled.div`
  .button {
    margin-top: 20px;
  }
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
      </section>
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
              fluid(maxWidth: 600, quality: 80) {
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
