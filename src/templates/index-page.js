import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Title from '../components/Title';
import Button from '../components/Button';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/HeroBackgroundImage';

import NonStretchedImage from '../components/NonStretchedImage';

export const IndexPageTemplate = ({
  heading,
  bgimage,
  facts,
  centeredSection,
  productSection,
  quotes,
  solutions,
  splitSectionImage,
  content,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <Hero
        heading={heading}
        subheading=""
        backgroundImage={bgimage.publicURL}
        buttonText="Learn more"
        anchorLink="#facts"
        backgroundCSS={`linear-gradient(177.9deg, #0E111B 8.35%, rgba(14, 17, 27, 0.21) 27.24%), linear-gradient(0deg, rgba(14, 17, 27, 0.21), rgba(14, 17, 27, 0.21)), linear-gradient(180deg, rgba(4, 5, 10, 0) 49.95%, #0E111B 100%), url(${bgimage.publicURL})`}
      />
      <section className="section has-dark-background">
        <div className="container">
          <h1>{heading}</h1>
          <p>This is index page</p>
          <PostContent content={content} />
        </div>
      </section>
    </>
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
    quotes,
    itemsSection,
    splitSection,
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
        quotes={quotes}
        solutions={itemsSection}
        splitSectionImage={splitSection.bgimage}
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
        }

        items {
          heading
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
          bgimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
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
          featuredimageBackground {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 50) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }

        quotes {
          authorName
          authorPosition
          quoteText
          authorImage {
            childImageSharp {
              fluid(maxHeight: 200, quality: 50) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }

        itemsSection {
          heading
          button {
            text
            path
          }
          items {
            heading
            path
            featuredimage {
              childImageSharp {
                fluid(maxHeight: 720, quality: 70) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                }
              }
            }
          }
        }
        splitSection {
          bgimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
