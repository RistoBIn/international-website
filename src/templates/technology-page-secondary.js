import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import LargeImageWithSplitSection from '../components/LargeImageWithSplitSection';
import generateHTML from '../utils/generateHTML';
import NonStretchedImage from '../components/NonStretchedImage';
import Button from '../components/Button';
import SectionListAlternating from '../components/SectionListAlternating';

export const TechnologyPageTemplate = ({
  contentComponent,
  description,
  heading,
  sectionOne,
  sectionTwo,
  imageSection,
  sectionFour,
  sectionList,
  centeredSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="has-dark-background product-page-primary">
      <section className="section">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      {sectionOne && sectionOne.featuredimage && sectionOne.left ? (
        <LargeImageWithSplitSection
          className="section large-image product-page-primary"
          image={sectionOne.featuredimage}
          leftColumn={
            <PostContent
              content={generateHTML(sectionOne.left)}
              className="content is-left-aligned"
            />
          }
          rightColumn={
            <PostContent
              content={generateHTML(sectionOne.right)}
              className="content is-left-aligned"
            />
          }
        />
      ) : (
        <></>
      )}

      {sectionTwo ? (
        <section className="section is-large-top centered-section product-page-primary">
          <div className="container">
            <PostContent
              content={generateHTML(sectionTwo)}
              className="content centered-free-text"
            />
          </div>
        </section>
      ) : (
        <></>
      )}
      {imageSection && imageSection.featuredimage ? (
        <section className="background-image-lines is-medium section centered-section product-page-primary">
          <div className="container">
            <NonStretchedImage
              objectFit="contain"
              alt=""
              className="image"
              {...imageSection.featuredimage}
            />
          </div>
        </section>
      ) : (
        <></>
      )}

      <SectionListAlternating
        sections={sectionList}
        className="section alternating-sections"
      />

      {sectionFour ? (
        <LargeImageWithSplitSection
          className="section is-large large-image product-page-primary"
          image={sectionFour.featuredimage}
          leftColumn={
            <>
              <h2>{sectionFour.heading}</h2>
              <Button
                className="is-primary"
                text={sectionFour.button.text}
                path={sectionFour.button.path}
              />
            </>
          }
          rightColumn={
            <PostContent
              content={generateHTML(sectionFour.right)}
              className="content is-left-aligned large"
            />
          }
        />
      ) : (
        <></>
      )}

      {centeredSection ? (
        <LargeImageWithSplitSection
          className="section is-medium large-image product-page-primary"
          image={centeredSection.featuredimage}
          leftColumn={
            <>
              <h2>
                <PostContent
                  content={generateHTML(centeredSection.left)}
                  className="content"
                />
              </h2>
              {centeredSection.button && centeredSection.button.text ? (
                <Button
                  className="is-primary"
                  text={centeredSection.button.text}
                  path={centeredSection.button.path}
                />
              ) : (
                <></>
              )}
            </>
          }
          rightColumn={
            <PostContent
              content={generateHTML(centeredSection.right)}
              className="content"
            />
          }
        />
      ) : (
        <></>
      )}
    </section>
  );
};

const TechnologyPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    alternatingSections,
    centeredSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <TechnologyPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        sectionOne={sectionOne}
        sectionTwo={sectionTwo}
        imageSection={sectionThree}
        sectionFour={sectionFour}
        sectionList={alternatingSections}
        centeredSection={centeredSection}
      />
    </Layout>
  );
};

export default TechnologyPage;

export const pageQuery = graphql`
  query TechnologyPageSecondaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
        sectionOne {
          left
          right
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1410, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        sectionTwo
        sectionThree {
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 600, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        sectionFour {
          heading
          button {
            path
            text
          }

          right
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1410, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        alternatingSections {
          description
          button {
            text
            path
          }

          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 671, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        centeredSection {
          left
          button {
            path
            text
          }
          right
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1920, quality: 80) {
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
