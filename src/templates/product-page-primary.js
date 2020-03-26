import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SplittedSection from '../components/SplittedSection';
import NonStretchedImage from '../components/NonStretchedImage';
import generateHTML from '../utils/generateHTML';

export const ProductPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  item1vsitem2,
  featuredimageSecondary,
  centeredText,
  thirdSection,
}) => {
  const PostContent = contentComponent || Content;
  const printText = generateHTML(centeredText);
  return (
    <section className="has-dark-background">
      <section className="section">
        <div className="container">
          <h1>{heading}</h1>
          <p>{description}</p>
          <PostContent content={content} />
        </div>
      </section>

      <SplittedSection
        className="content has-dark-background"
        shouldReorderOnMobile
        leftColumn={<PostContent content={content} />}
        rightColumn={
          <NonStretchedImage
            fluid={featuredimageSecondary.childImageSharp.fluid}
            objectFit="contain"
            alt=""
            className="image"
          />
        }
      />
      <section className="section">
        <div className="container content">
          <PostContent content={printText} />
        </div>
      </section>
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
    item1vsitem2,
    featuredimageSecondary,
    centeredText,
    thirdSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ProductPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        item1vsitem2={item1vsitem2}
        featuredimageSecondary={featuredimageSecondary}
        centeredText={centeredText}
        thirdSection={thirdSection}
      />
    </Layout>
  );
};

export default ProductPage;

export const pageQuery = graphql`
  query ProductPagePrimaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
        item1vsitem2 {
          heading
          subheading
          item1 {
            heading
            featuredimage {
              childImageSharp {
                fluid(maxHeight: 1180, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                }
              }
            }
            items
          }
          item2 {
            heading
            featuredimage {
              childImageSharp {
                fluid(maxHeight: 1180, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                }
              }
            }
            items
          }
        }
        featuredimageSecondary {
          childImageSharp {
            fluid(maxWidth: 405, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
          }
        }
        centeredText
        thirdSection {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
          content
        }
      }
    }
  }
`;
