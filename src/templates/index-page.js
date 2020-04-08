import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Title from '../components/Title';
import { HorizontalView as SolutionsHorizontal } from '../components/AllSolutions';
import ImageBoxesWithNavigation from '../components/ImageBoxesWithNavigation';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/HeroBackgroundImage';

import NonStretchedImage from '../components/NonStretchedImage';
import HighlightedData from '../components/HighlightedData';
import SectionBackgroundImage from '../components/SectionBackgroundImage';
import QuotesList from '../components/QuotesList';
import SplitWithFullWidthImage from '../components/SplitWithFullWidthImage';

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
        className="is-fullheight front-page"
        heading={heading}
        subheading=""
        backgroundImage={bgimage}
        buttonText="Learn more"
        anchorLink="#facts"
        backgroundCSS="linear-gradient(177.9deg, #0E111B 8.35%, rgba(14, 17, 27, 0.21) 27.24%), linear-gradient(0deg, rgba(14, 17, 27, 0.21), rgba(14, 17, 27, 0.21)), linear-gradient(180deg, rgba(4, 5, 10, 0) 49.95%, #0E111B 100%)"
      />
      <HighlightedData highlighted={facts} id="facts" />
      <SectionBackgroundImage
        {...centeredSection}
        backgroundCSS={`linear-gradient(186.69deg, #0E111B 22.36%, rgba(14, 17, 27, 0.21) 37.8%), linear-gradient(180deg, rgba(4, 5, 10, 0) 49.95%, #0E111B 100%),  url(${centeredSection.bgimage.publicURL})`}
      />
      <section id="camera--title" className="section has-dark-background">
        <div className="container">
          <Title
            title={productSection.heading}
            description={productSection.description}
            position="center"
          />
        </div>
      </section>
      <section id="camera--image" className="has-dark-background">
        <div
          className="product-image"
          style={{
            backgroundImage: `url(${productSection.featuredimageBackground.publicURL})`,
          }}
        >
          <NonStretchedImage
            fluid={productSection.featuredimage.childImageSharp.fluid}
            objectFit="contain"
            alt={productSection.heading}
            className="image"
          />
        </div>
      </section>
      <QuotesList quotes={quotes} className="section has-dark-background" />
      <SolutionsHorizontal
        heading={solutions.heading}
        buttonText={solutions.button.text}
        buttonPath={solutions.button.path}
      />
      <SplitWithFullWidthImage
        id="inspirational-quote"
        className="has-dark-background"
        splitSectionImage={splitSectionImage}
      >
        <PostContent content={content} className="content" />
      </SplitWithFullWidthImage>
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
            publicURL
          }
        }

        quotes {
          authorName
          authorPosition
          quoteText
        }

        itemsSection {
          heading
          button {
            text
            path
          }
        }
        splitSection {
          bgimage {
            childImageSharp {
              fluid(maxHeight: 400, quality: 60) {
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
