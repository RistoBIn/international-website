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
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  grid-gap: 30px 60px;
  padding-top: 5rem;
  .image-item {
    margin: auto;
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
  contentComponent,
  heading,
  description,
  featuredimages,
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

      {/* <ImageGrid>
        {featuredimages.map(imageItem => (
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="image image-item"
            {...imageItem.image}
          />
        ))}
      </ImageGrid> */}
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
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ResearchPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimages={featuredimages}
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
              fluid(maxHeight: 600, quality: 80) {
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
