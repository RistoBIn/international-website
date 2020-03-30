import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SplittedSection from '../components/SplittedSection';
import generateHTML from '../utils/generateHTML';

export const AboutPageSecondaryTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredimage,
  primarySection,
  centeredTextSection,
  centeredImageSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="has-dark-background about-page-secondary">
        <div className="about-page-secondary-image">
          <Img
            fluid={featuredimage.childImageSharp.fluid}
            alt="About image"
            className="image"
          />
        </div>
      </section>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(primarySection.left.content)}
                className="content is-left-aligned"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(primarySection.right.content)}
                className="content is-left-aligned"
              />
            }
          />
        </div>
      </section>
      <section className="section has-dark-background centered-free-text">
        <div className="container content centered-free-text">
          <PostContent content={generateHTML(centeredTextSection.content)} />
        </div>
      </section>
      <section className="has-dark-background project-page-template">
        <div className="container">
          <figure className="figure">
            <Img
              fluid={centeredImageSection.featuredimage.childImageSharp.fluid}
              alt="About image"
              className="image container"
            />
            <figcaption className="caption container">
              {centeredImageSection.featuredimageCaption}
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
    primarySection,
    centeredTextSection,
    centeredImageSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageSecondaryTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        primarySection={primarySection}
        centeredTextSection={centeredTextSection}
        centeredImageSection={centeredImageSection}
      />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPageSecondaryTemplateById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        description
        seoDescription
        featuredimage {
          childImageSharp {
            fluid(maxHeight: 600) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
        primarySection {
          left {
            content
          }
          right {
            content
          }
        }
        centeredTextSection {
          content
        }
        centeredImageSection {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 600) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
          featuredimageCaption
        }
      }
    }
  }
`;
