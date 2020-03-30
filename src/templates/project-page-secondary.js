import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SplitWithFullWidthImage from '../components/SplitWithFullWidthImage';

export const ProjectPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredimage,
  featuredimageCaption,
  primarySection,
  splitSectionImage,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background project-page-template">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="has-dark-background project-page-template">
        <figure className="figure">
          <Img
            fluid={featuredimage.childImageSharp.fluid}
            alt="About image"
            className="image container"
          />
          <figcaption className="caption container">
            {featuredimageCaption}
          </figcaption>
        </figure>
      </section>
      <section className="section has-dark-background project-page-template">
        <div className="container">
          <h1 className="section--subheading">{primarySection.heading}</h1>
          <p className="section--description">{primarySection.description}</p>
        </div>
      </section>
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

const ProjectPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
    featuredimageCaption,
    primarySection,
    splitSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ProjectPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        featuredimageCaption={featuredimageCaption}
        primarySection={primarySection}
        splitSectionImage={splitSection.bgimage}
      />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query ProjectPageTemplateById($id: String!) {
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
        featuredimageCaption
        primarySection {
          heading
          description
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
