import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Title from '../components/Title';
import Button from '../components/Button';
import ImageBoxesWithNavigation from '../components/ImageBoxesWithNavigation';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/HeroBackgroundImage';

import NonStretchedImage from '../components/NonStretchedImage';
import HighlightedData from '../components/HighlightedData';
import SectionBackgroundImage from '../components/SectionBackgroundImage';
import QuotesList from '../components/QuotesList';

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
        className="is-fullheight"
        heading={heading}
        subheading=""
        backgroundImage={bgimage.publicURL}
        buttonText="Learn more"
        anchorLink="#facts"
        backgroundCSS={`linear-gradient(177.9deg, #0E111B 8.35%, rgba(14, 17, 27, 0.21) 27.24%), linear-gradient(0deg, rgba(14, 17, 27, 0.21), rgba(14, 17, 27, 0.21)), linear-gradient(180deg, rgba(4, 5, 10, 0) 49.95%, #0E111B 100%), url(${bgimage.publicURL})`}
      />
      <HighlightedData highlighted={facts} id="facts" />
      <SectionBackgroundImage
        {...centeredSection}
        backgroundCSS={`linear-gradient(186.69deg, #0E111B 22.36%, rgba(14, 17, 27, 0.21) 37.8%), linear-gradient(180deg, rgba(4, 5, 10, 0) 49.95%, #0E111B 100%),  url(${centeredSection.bgimage.publicURL})`}
      />
      <QuotesList quotes={quotes} className="section has-dark-background" />
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
        <div className="product-image">
          <NonStretchedImage
            fluid={productSection.featuredimage.childImageSharp.fluid}
            objectFit="contain"
            alt={productSection.heading}
            className="image"
          />
        </div>
      </section>
      <ImageBoxesWithNavigation
        items={solutions.items}
        heading={solutions.heading}
        buttonText={solutions.button.text}
        buttonPath={solutions.button.path}
      />
      <section id="inspirational-quote" className="section has-dark-background">
        <div
          className="wrapper-two-split"
          style={{
            background: `linear-gradient(177.9deg, #0E111B 0%, rgba(14, 17, 27, 0.61) 27.24%), linear-gradient(0deg, rgba(14, 17, 27, 0.21), rgba(14, 17, 27, 0.21)),  url(${splitSectionImage.publicURL})`,
          }}
        >
          <div
            style={{ backgroundImage: `url(${splitSectionImage.publicURL})` }}
            className="bg-image"
          />
          <>
            <PostContent content={content} className="content" />
          </>
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
            publicURL
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
          authorImage {
            childImageSharp {
              fluid(maxWidth: 50, quality: 80) {
                ...GatsbyImageSharpFluid
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
              publicURL
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
            publicURL
          }
        }
      }
    }
  }
`;
