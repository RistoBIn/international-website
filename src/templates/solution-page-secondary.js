import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/Hero';
import SectionList from '../components/SectionList';
import ReadMoreIcon from '../img/readmore-arrow.inline.svg';

export const SolutionPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  featuredimage,
  splitSections,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="solution-page-secondary has-dark-background">
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
      <section className="section is-medium has-dark-background">
        <div className="container">
          <PostContent content={content} className="content is-left-aligned" />
        </div>
      </section>
    </section>
  );
};

const SolutionHero = ({
  className,
  heading,
  description,
  anchorLink,
  imageURL,
}) => {
  return (
    <section
      className={classNames('hero', className)}
      style={{
        backgroundImage: `url(${imageURL})`,
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
      />
    </Layout>
  );
};

export default SolutionPage;

export const pageQuery = graphql`
  query SolutionPageSecondaryById($id: String!) {
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
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
          }
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
