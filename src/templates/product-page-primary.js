import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SplittedSection from '../components/SplittedSection';
import NonStretchedImage from '../components/NonStretchedImage';
import ComparisonSection from '../components/ComparisonSection';
import Title from '../components/Title';
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
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      {item1vsitem2 ? (
        <ComparisonSection
          heading={item1vsitem2.heading}
          subheading={item1vsitem2.subheading}
          item1={item1vsitem2.item1}
          item2={item1vsitem2.item2}
          className=""
        />
      ) : (
        <></>
      )}

      <SplittedSection
        className="section content has-dark-background"
        shouldReorderOnMobile
        leftColumn={<PostContent content={content} />}
        rightColumn={
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="image"
            {...featuredimageSecondary}
          />
        }
      />
      <section className="section centered-free-text">
        <div className="container content  centered-free-text">
          <PostContent content={printText} />
        </div>
      </section>
      <SplittedSection
        className="section content has-dark-background"
        rightColumn={
          <PostContent content={generateHTML(thirdSection.content)} />
        }
        leftColumn={
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="image"
            {...thirdSection.featuredimage}
          />
        }
      />
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
              publicURL
              extension
            }
            items
          }
          item2 {
            heading
            featuredimage {
              publicURL
              extension
            }
            items
          }
        }
        featuredimageSecondary {
          publicURL
          extension
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
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 405, quality: 100) {
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
