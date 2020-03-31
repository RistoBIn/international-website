import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import generateHTML from '../utils/generateHTML';
import Content, { HTMLContent } from '../components/Content';
import SplitWithFullWidthImage from '../components/SplitWithFullWidthImage';

export const ProjectPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredimage,
  featuredimageCaption,
  splitSection,
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
        <div className="container">
          <figure className="figure">
            <Img
              fluid={featuredimage.childImageSharp.fluid}
              alt="About image"
              className="image container"
            />
            {featuredimageCaption ? (
              <figcaption className="caption container">
                {featuredimageCaption}
              </figcaption>
            ) : (
              <></>
            )}
          </figure>
        </div>
      </section>
      <section className="section is-medium has-dark-background project-page-template">
        <div className="container">
          <PostContent content={content} className="content is-left-aligned" />
        </div>
      </section>
      {splitSection ? (
        <SplitWithFullWidthImage
          id="inspirational-quote"
          className="has-dark-background"
          splitSectionImage={splitSection.bgimage}
        >
          <PostContent
            content={generateHTML(splitSection.content)}
            className="content"
          />
        </SplitWithFullWidthImage>
      ) : (
        <></>
      )}
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
        splitSection={splitSection}
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
        splitSection {
          content
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
