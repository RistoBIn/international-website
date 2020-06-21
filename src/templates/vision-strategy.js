import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SplittedSection from '../components/SplittedSection';
import QuadSplitSection from '../components/QuadSplitSection';
import CollapsibleList from '../components/CollapsibleList';
import generateHTML from '../utils/generateHTML';

export const AboutPageSecondaryTemplate = ({
  contentComponent,
  heading,
  description,
  featuredimage,
  primarySplitSection,
  centeredTextSection,
  primaryCenteredImageSection,
  tertiarySplitSection,
  quaternarySplitSection,
  primaryCollapsibleList,
  quinarySplitSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background vision-strategy">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="has-dark-background vision-strategy">
        <div className="vision-strategy-image">
          <Img
            fluid={featuredimage.childImageSharp.fluid}
            alt="About image"
            className="image full-width"
          />
        </div>
      </section>
      <section className="section has-dark-background vision-strategy">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(primarySplitSection.left)}
                className="content is-left-aligned left-wrapper"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(primarySplitSection.right)}
                className="content is-left-aligned right-wrapper grey-background"
              />
            }
          />
        </div>
      </section>
      <section className="section has-dark-background centered-free-text">
        <div className="content centered-free-text">
          <PostContent content={generateHTML(centeredTextSection.content)} />
        </div>
      </section>
      <section className="has-dark-background vision-strategy">
        <div className="container">
          <figure className="figure">
            <Img
              fluid={
                primaryCenteredImageSection.featuredimage.childImageSharp.fluid
              }
              alt="About image"
              className="image"
            />
            <figcaption className="caption">
              {primaryCenteredImageSection.featuredimageCaption}
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="section has-dark-background vision-strategy">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(primaryCenteredImageSection.left)}
                className="content"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(primaryCenteredImageSection.right)}
                className="content padding-top-header"
              />
            }
          />
        </div>
      </section>
      <section className="section has-dark-background vision-strategy boxes">
        <div className="container">
          <div className="wrapper">
            <PostContent
              content={generateHTML(tertiarySplitSection.left)}
              className="content is-left-aligned"
            />
            <QuadSplitSection
              contentItems={tertiarySplitSection.right}
              contentItemsCss="grey-background quad-wrapper"
            />
          </div>
        </div>
      </section>
      <section className="section has-dark-background vision-strategy">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(quaternarySplitSection.left)}
                className="content is-left-aligned"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(quaternarySplitSection.right)}
                className="content is-left-aligned"
              />
            }
          />
        </div>
      </section>
      <section className="section has-dark-background vision-strategy">
        <div className="container">
          <CollapsibleList
            collapsibleItems={primaryCollapsibleList.listItems}
            className="has-dark-background"
          />
        </div>
      </section>
      <section className="section has-dark-background vision-strategy">
        <div className="container">
          <figure className="figure">
            <Img
              fluid={quinarySplitSection.featuredimage.childImageSharp.fluid}
              alt="About image"
              className="image"
            />
          </figure>
        </div>
      </section>
      <section
        id="vision-last"
        className="section has-dark-background vision-strategy"
      >
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(quinarySplitSection.left)}
                className="content is-left-aligned"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(quinarySplitSection.right)}
                className="content is-left-aligned"
              />
            }
          />
        </div>
      </section>
    </>
  );
};

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
    primarySplitSection,
    centeredTextSection,
    primaryCenteredImageSection,
    secondarySplitSection,
    tertiarySplitSection,
    quaternarySplitSection,
    primaryCollapsibleList,
    secondaryCenteredImageSection,
    quinarySplitSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageSecondaryTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        primarySplitSection={primarySplitSection}
        centeredTextSection={centeredTextSection}
        primaryCenteredImageSection={primaryCenteredImageSection}
        secondarySplitSection={secondarySplitSection}
        tertiarySplitSection={tertiarySplitSection}
        quaternarySplitSection={quaternarySplitSection}
        primaryCollapsibleList={primaryCollapsibleList}
        secondaryCenteredImageSection={secondaryCenteredImageSection}
        quinarySplitSection={quinarySplitSection}
      />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPageSecondaryTemplateById($id: String!) {
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
            fluid(maxHeight: 600, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        primarySplitSection {
          left
          right
        }
        centeredTextSection {
          content
        }
        primaryCenteredImageSection {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 600, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          featuredimageCaption
          left
          right
        }
        tertiarySplitSection {
          left
          right {
            content
          }
        }
        quaternarySplitSection {
          left
          right
        }
        primaryCollapsibleList {
          listItems {
            heading
            content
          }
        }
        quinarySplitSection {
          left
          right
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 800, quality: 80) {
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
