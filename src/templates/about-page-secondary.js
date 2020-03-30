import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SplittedSection from '../components/SplittedSection';
import generateHTML from '../utils/generateHTML';

export const AboutPageSecondaryTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredimage,
  primarySplitSection,
  centeredTextSection,
  primaryCenteredImageSection,
  secondarySplitSection,
  tertiarySplitSection,
  quaternarySplitSection,
  secondaryCenteredImageSection,
  quinarySplitSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="has-dark-background about-page-secondary">
        <div className="about-page-secondary-image">
          <Img
            fluid={featuredimage.childImageSharp.fluid}
            alt="About image"
            className="image"
          />
        </div>
      </section>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(primarySplitSection.left.content)}
                className="content is-left-aligned"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(primarySplitSection.right.content)}
                className="content is-left-aligned"
              />
            }
          />
        </div>
      </section>
      <section className="section has-dark-background centered-free-text">
        <div className="container content centered-free-text">
          <PostContent content={generateHTML(centeredTextSection.content)} />
        </div>
      </section>
      <section className="has-dark-background about-page-secondary">
        <div className="container">
          <figure className="figure">
            <Img
              fluid={
                primaryCenteredImageSection.featuredimage.childImageSharp.fluid
              }
              alt="About image"
              className="image container"
            />
            <figcaption className="caption container">
              {primaryCenteredImageSection.featuredimageCaption}
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(secondarySplitSection.left.content)}
                className="content is-left-aligned"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(secondarySplitSection.right.content)}
                className="content is-left-aligned"
              />
            }
          />
        </div>
      </section>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(tertiarySplitSection.left.content)}
                className="content is-left-aligned"
              />
            }
            rightColumn={
              <>
                <SplittedSection
                  leftColumn={
                    <PostContent
                      content={generateHTML(
                        tertiarySplitSection.right.topNestedTertiarySplitSection
                          .left.content,
                      )}
                      className="content is-left-aligned"
                    />
                  }
                  rightColumn={
                    <PostContent
                      content={generateHTML(
                        tertiarySplitSection.right.topNestedTertiarySplitSection
                          .right.content,
                      )}
                      className="content is-left-aligned"
                    />
                  }
                />
                <SplittedSection
                  leftColumn={
                    <PostContent
                      content={generateHTML(
                        tertiarySplitSection.right
                          .bottomNestedTertiarySplitSection.left.content,
                      )}
                      className="content is-left-aligned"
                    />
                  }
                  rightColumn={
                    <PostContent
                      content={generateHTML(
                        tertiarySplitSection.right
                          .bottomNestedTertiarySplitSection.right.content,
                      )}
                      className="content is-left-aligned"
                    />
                  }
                />
              </>
            }
          />
        </div>
      </section>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(quaternarySplitSection.left.content)}
                className="content is-left-aligned"
              />
            }
            rightColumn={
              <PostContent
                content={generateHTML(quaternarySplitSection.right.content)}
                className="content is-left-aligned"
              />
            }
          />
        </div>
      </section>
      <section className="has-dark-background about-page-secondary">
        <div className="container">
          <figure className="figure">
            <Img
              fluid={
                secondaryCenteredImageSection.featuredimage.childImageSharp
                  .fluid
              }
              alt="About image"
              className="image container"
            />
            <figcaption className="caption container" />
          </figure>
        </div>
      </section>
      <section className="section has-dark-background about-page-secondary">
        <div className="container">
          <SplittedSection
            leftColumn={
              <PostContent
                content={generateHTML(quinarySplitSection.left.content)}
                className="content is-left-aligned"
              />
            }
            rightColumn={<></>}
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
            fluid(maxHeight: 600) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
        primarySplitSection {
          left {
            content
          }
          right {
            content
          }
        }
        centeredTextSection {
          content
        }
        primaryCenteredImageSection {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 600) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
          featuredimageCaption
        }
        secondarySplitSection {
          left {
            content
          }
          right {
            content
          }
        }
        tertiarySplitSection {
          left {
            content
          }
          right {
            topNestedTertiarySplitSection {
              left {
                content
              }
              right {
                content
              }
            }
            bottomNestedTertiarySplitSection {
              left {
                content
              }
              right {
                content
              }
            }
          }
        }
        quaternarySplitSection {
          left {
            content
          }
          right {
            content
          }
        }
        secondaryCenteredImageSection {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 600) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        quinarySplitSection {
          left {
            content
          }
        }
      }
    }
  }
`;
