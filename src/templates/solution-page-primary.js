import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SectionList from '../components/SectionList';
import SplittedSection from '../components/SplittedSection';
import LargeImageWithSplitSection from '../components/LargeImageWithSplitSection';
import SideImageSection from '../components/SideImageSection';
import GetStartSection from '../components/GetStartSection';
import ButtonsList from '../components/Button/ButtonsList';
import SolutionHero from '../components/SolutionHero';
import ExperiencesList from '../components/ExperiencesList';
import BackgroundImage from '../components/BackgroundImage';
import ReadMoreIcon from '../img/readmore-arrow.inline.svg';
import generateHTML from '../utils/generateHTML';

const Author = styled.p`
  margin-top: 24px;
  margin-bottom: -30px;
`;

export const SolutionPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  featuredimage,
  splitSections,
  imageSection,
  imageSplitSection,
  experiencesSection,
  descriptionSection,
  blueThinkGo,
  getStartSection,
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
      {imageSection ? (
        <LargeImageWithSplitSection
          image={imageSection.featuredimage}
          subheading={imageSection.subheading}
          leftColumn={
            <PostContent
              content={generateHTML(imageSection.left)}
              className="content is-left-aligned"
            />
          }
          rightColumn={
            <>
              <PostContent
                content={generateHTML(imageSection.right)}
                className="content is-left-aligned"
              />
              {imageSection.linkButtons ? (
                <ButtonsList buttons={imageSection.linkButtons} />
              ) : (
                <></>
              )}
            </>
          }
        />
      ) : (
        <></>
      )}
      <SideImageSection sectionData={imageSplitSection} />
      {experiencesSection ? (
        <section className="section has-dark-background">
          <div className="container">
            <div className="column center-align-wrapper">
              <div className="short-width-wrap">
                <h2 className="section--title has-mobile-left">
                  {experiencesSection.heading}
                </h2>
              </div>
              <HTMLContent
                className="description"
                content={experiencesSection.content}
              />
            </div>
            <div>
              <ExperiencesList experiences={experiencesSection.experiences} />
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
      {descriptionSection ? (
        <BackgroundImage
          image={descriptionSection.backgroundImage}
          id
          style
          htmlTag="div"
        >
          <section className="section">
            <div className="container">
              <div className="column center-align-wrapper">
                <HTMLContent
                  className="description is-italic has-text-weight-bold"
                  content={descriptionSection.description}
                />
                <Author className="section--subheading">
                  {descriptionSection.author}
                </Author>
              </div>
            </div>
          </section>
        </BackgroundImage>
      ) : (
        <></>
      )}
      <SideImageSection sectionData={blueThinkGo} />
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
      <GetStartSection sectionData={getStartSection} />
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
    imageSplitSection,
    experiencesSection,
    descriptionSection,
    blueThinkGo,
    getStartSection,
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
        imageSplitSection={imageSplitSection}
        experiencesSection={experiencesSection}
        descriptionSection={descriptionSection}
        blueThinkGo={blueThinkGo}
        getStartSection={getStartSection}
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
          linkButtons {
            buttonTxt
            buttonLink
          }
        }
        imageSection {
          left
          right
          subheading
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1410, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          linkButtons {
            buttonTxt
            buttonLink
          }
        }
        imageSplitSection {
          heading
          content
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 440, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          imageSide
          linkButtons {
            buttonTxt
            buttonLink
          }
        }
        experiencesSection {
          heading
          content
          experiences {
            featuredimage {
              publicURL
              extension
              childImageSharp {
                fluid(maxHeight: 160, quality: 80) {
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
          backgroundImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1410, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        blueThinkGo {
          heading
          subheading
          content
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 440, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          imageSide
          linkButtons {
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
