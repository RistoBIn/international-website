import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SectionList from '../components/SectionList';
import NonStretchedImage from '../components/NonStretchedImage';
import SplittedSection from '../components/SplittedSection';
import ReadMoreIcon from '../img/readmore-arrow.inline.svg';
import generateHTML from '../utils/generateHTML';

export const SolutionPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  featuredimage,
  splitSections,
  imageSection,
  splitSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="solution-page-primary solution-page has-dark-background">
      <SolutionHero
        className="is-large"
        heading={heading}
        description={description}
        imageURL={featuredimage.publicURL}
        anchorLink="#first-section"
      />
      <section id="read-more" className="section" aria-hidden="true">
        <div className="container">
          <AnchorLink
            href="#first-section"
            className={classNames('read-more-button')}
          >
            <ReadMoreIcon />
          </AnchorLink>
        </div>
      </section>
      <SectionList id="first-section" items={splitSections} />
      {imageSection && imageSection.featuredimage ? (
        <section className="section has-dark-background">
          <div className="container">
            <NonStretchedImage
              fluid={imageSection.featuredimage.childImageSharp.fluid}
              objectFit="contain"
              alt=""
              className="image"
            />
            <SplittedSection
              leftColumn={
                <PostContent
                  content={generateHTML(imageSection.left)}
                  className="content is-left-aligned"
                />
              }
              rightColumn={
                <PostContent
                  content={generateHTML(imageSection.right)}
                  className="content is-left-aligned"
                />
              }
            />
          </div>
        </section>
      ) : (
        <></>
      )}

      {splitSection ? (
        <section className="section has-dark-background">
          <div className="container">
            <h2>{splitSection.heading}</h2>
            <SplittedSection
              leftColumn={
                <PostContent
                  content={generateHTML(splitSection.left)}
                  className="content is-left-aligned"
                />
              }
              rightColumn={
                <PostContent
                  content={generateHTML(splitSection.right)}
                  className="content is-left-aligned"
                />
              }
            />
          </div>
        </section>
      ) : (
        <></>
      )}

      {content ? (
        <section className="section is-medium has-dark-background">
          <div className="container">
            <PostContent
              content={content}
              className="content is-left-aligned"
            />
          </div>
        </section>
      ) : (
        <></>
      )}
    </section>
  );
};

const SolutionHero = ({ className, heading, description, imageURL }) => {
  return (
    <section
      className={classNames('hero', className)}
      style={{
        background: `linear-gradient(358.35deg, #0E111B 4.06%, rgba(14, 17, 27, 0.21) 34.1%), linear-gradient(0deg, rgba(14, 17, 27, 0.3), rgba(14, 17, 27, 0.3)), url(${imageURL})`,
      }}
    >
      <div className={classNames('hero-body')}>
        <div className="container">
          <div>
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    featuredimage,
    splitSections,
    imageSection,
    splitSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <SolutionPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        splitSections={splitSections}
        imageSection={imageSection}
        splitSection={splitSection}
      />
    </Layout>
  );
};

export default SolutionPage;

export const pageQuery = graphql`
  query SolutionPagePrimaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        seoDescription
        description
        featuredimage {
          publicURL
          extension
        }
        splitSections {
          heading
          content
          subheading
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 600, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        imageSection {
          left
          right
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 1410, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        splitSection {
          heading
          left
          right
        }
      }
    }
  }
`;
