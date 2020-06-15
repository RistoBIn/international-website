import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SectionList from '../components/SectionList';
import NonStretchedImage from '../components/NonStretchedImage';
import SplittedSection from '../components/SplittedSection';
import LargeImageWithSplitSection from '../components/LargeImageWithSplitSection';
import BorderedContentSection from '../components/BorderedContentSection';
import SolutionHero from '../components/SolutionHero';
import ReadMoreIcon from '../img/readmore-arrow.inline.svg';
import generateHTML from '../utils/generateHTML';

export const SolutionPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  featuredimage,
  splitSections,
  middleImage,
  secondSplitSections,
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
      {middleImage ? (
        <section className="section">
          <NonStretchedImage
            fluid={middleImage.childImageSharp.fluid}
            publicURL={middleImage.publicURL}
            extension={middleImage.extension}
          />
        </section>
      ) : (
        <></>
      )}
      {secondSplitSections ? (
        <SectionList items={secondSplitSections} />
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
    middleImage,
    imageSection,
    splitSection,
    secondSplitSections,
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
        middleImage={middleImage}
        secondSplitSections={secondSplitSections}
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
          buttonList {
            buttonTxt
            buttonLink
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
        imageSplitSection {
          heading
          subheading
          content
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 440, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          buttonList {
            buttonTxt
            buttonLink
          }
        }
        experiencesSection {
          heading
          content
          experiences {
            featuredimage {
              childImageSharp {
                fluid(maxHeight: 440, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                  presentationWidth
                }
              }
            }
            description
          }
        }
        descriptionSection {
          description
          author
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 1410, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        blueThinkGo {
          heading
          subheading
          description
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 440, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          buttonList {
            buttonTxt
            buttonLink
          }
        }
        getStartSection {
          heading
          description
          buttonTxt
          buttonLink
          topImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 491, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          mobileTopImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 560, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
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
