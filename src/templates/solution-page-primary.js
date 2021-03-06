import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SectionList from '../components/SectionList';
import SplittedSection from '../components/SplittedSection';
import LargeImageWithSplitSection from '../components/LargeImageWithSplitSection';
import BorderedContentSection from '../components/BorderedContentSection';
import BackgroundImage from '../components/BackgroundImage';
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
  btgo,
  splitSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="solution-page-primary solution-page has-dark-background">
      <SolutionHero
        className="is-large"
        heading={heading}
        description={description}
        image={featuredimage}
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
      {btgo ? (
        <BorderedContentSection
          heading={btgo.heading}
          subheading={btgo.subheading}
          fluidImage={btgo.featuredimage.childImageSharp.fluid}
          className="section is-medium"
        >
          <PostContent
            content={generateHTML(btgo.description)}
            className="content links-are-buttons"
          />
        </BorderedContentSection>
      ) : (
        <></>
      )}

      {imageSection ? (
        <LargeImageWithSplitSection
          image={imageSection.featuredimage}
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

const SolutionHero = ({ className, heading, description, image }) => {
  return (
    <BackgroundImage
      className={classNames('hero', className)}
      image={image}
      filterStyle={{
        background:
          'linear-gradient(358.35deg, #0E111B 4.06%, rgba(14, 17, 27, 0.21) 34.1%), linear-gradient(0deg, rgba(14, 17, 27, 0.3), rgba(14, 17, 27, 0.3))',
      }}
      style={{
        backgroundPosition: 'bottom center !important',
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
    </BackgroundImage>
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
    btgo,
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
        btgo={btgo}
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
          childImageSharp {
            fluid(maxHeight: 630, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
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
              fluid(maxWidth: 600, quality: 80) {
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
              fluid(maxWidth: 1410, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
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
        btgo {
          subheading
          heading
          description
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 500, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
