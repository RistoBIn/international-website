import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

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
        </div>
        <div className="container">
          <p className="section--description">{primarySection.description}</p>
        </div>
      </section>
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
