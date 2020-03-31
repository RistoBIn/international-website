import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import LargeImageWithSplitSection from '../components/LargeImageWithSplitSection';
import generateHTML from '../utils/generateHTML';
import NonStretchedImage from '../components/NonStretchedImage';

export const ProductPageTemplate = ({
  contentComponent,
  description,
  heading,
  sectionOne,
  sectionTwo,
  imageSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="has-dark-background product-page-primary">
      <section className="section">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      {sectionOne ? (
        <LargeImageWithSplitSection
          className="section large-image product-page-primary"
          image={sectionOne.featuredimage}
          leftColumn={
            <PostContent
              content={generateHTML(sectionOne.left)}
              className="content is-left-aligned"
            />
          }
          rightColumn={
            <PostContent
              content={generateHTML(sectionOne.right)}
              className="content is-left-aligned"
            />
          }
        />
      ) : (
        <></>
      )}

      {sectionTwo ? (
        <section className="section centered-section product-page-primary">
          <div className="container">
            <PostContent
              content={generateHTML(sectionTwo)}
              className="content centered-free-text"
            />
          </div>
        </section>
      ) : (
        <></>
      )}
      {imageSection && imageSection.featuredimage ? (
        <section className="background-image-lines section is-medium centered-section product-page-primary">
          <div className="container">
            <NonStretchedImage
              objectFit="contain"
              alt=""
              className="image"
              {...imageSection.featuredimage}
            />
          </div>
        </section>
      ) : (
        <></>
      )}
    </section>
  );
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    alternatingSections,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ProductPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        sectionOne={sectionOne}
        sectionTwo={sectionTwo}
        imageSection={sectionThree}
        sectionFour={sectionFour}
        sectionList={alternatingSections}
      />
    </Layout>
  );
};

export default ProductPage;

export const pageQuery = graphql`
  query ProductPageSecondaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
        sectionOne {
          left
          right
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1410, quality: 90) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        sectionTwo
        sectionThree {
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 600, quality: 90) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        sectionFour {
          left {
            title
            button {
              path
              text
            }
          }
          right
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1410, quality: 90) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        alternatingSections {
          content {
            description
            button {
              text
              path
            }
          }
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 671, quality: 90) {
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
