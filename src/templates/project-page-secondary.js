import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import NonStretchedImage from '../components/NonStretchedImage';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const ProjectPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredImage,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background project-page-template">
        <div className="container">
          <div className="content">
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>
      <section className="has-dark-background project-page-template">
        <div className="project-page-template-image">
          <NonStretchedImage
            fluid={featuredImage.childImageSharp.fluid}
            alt="About image"
            className="image"
            objectFit="contain"
          />
        </div>
      </section>
      <section className="section has-dark-background project-page-template">
        <div className="container">
          <PostContent content={content} className="content" />
        </div>
      </section>
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
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ProjectPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredImage={featuredimage}
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
      }
    }
  }
`;
