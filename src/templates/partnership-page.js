import React from 'react';

import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { ButtonFlex } from '../styles';
import generateHTML from '../utils/generateHTML';
import Button from '../components/Button';
import SplittedSection from '../components/SplittedSection';
import NonStretchedImage from '../components/NonStretchedImage';

const StyledPartnershipPage = styled.section`
  section.image-section {
    padding-top: 0;
    .content,
    .button {
      margin: 10px 0;
    }
    .button-flex {
      padding-top: 10px;
    }
  }
  .split-section {
    .image,
    .left-content {
      margin: auto 0;
    }
  }
  .ai-systems {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`;

const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  padding-top 40px;
  & > .icon-item {
    padding: 0 20px;
    color: white;
    text-align: center;
    .image,
    p {
      margin: 0 auto;
    }
    .image {
      padding-bottom: 20px;
      svg {
        width: 160px;
      }
    }
  }
  @media only screen and (min-width: 768px) {
    & > .icon-item {
      .image {
        padding-bottom: 40px;
      }
    }
  }
`;

export const PartnershipPagePrimaryTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredImage,
  featuredimageSection,
  splitSection,
  features,
  partnering,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <StyledPartnershipPage>
      <section className="section has-dark-background">
        <div className="container centered has-text-centered">
          <h1 className="section--title has-text-centered">{heading}</h1>
          <p className="section--description has-text-centered">
            {description}
          </p>
        </div>
      </section>
      <section className="section has-dark-background image-section">
        <div className="container about-page-primary-image">
          <Img
            fluid={featuredImage.childImageSharp.fluid}
            alt="About image"
            className="image full-width"
            style={{ maxHeight: '100%', height: '700px' }}
          />
          <PostContent
            content={generateHTML(featuredimageSection.content)}
            className="content is-left-aligned"
          />
          <ButtonFlex className="button-flex">
            {featuredimageSection.buttons.map(buttonObject => (
              <Button
                className="is-primary"
                text={buttonObject.text}
                path={buttonObject.path}
              />
            ))}
          </ButtonFlex>
        </div>
      </section>
      <SplittedSection
        shouldReorderOnMobile
        leftColumnCSS="left-content"
        leftColumn={
          <>
            <p className="subheading">{splitSection.subheading}</p>
            <PostContent
              content={generateHTML(splitSection.content)}
              className="content"
            />
          </>
        }
        rightColumn={
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="image"
            {...splitSection.featuredimage}
          />
        }
        className="section has-dark-background split-section"
      />
      <section className="section has-dark-background ai-systems">
        <div className="container centered">
          <PostContent
            content={generateHTML(features.content)}
            className="content centered"
          />
        </div>
        <div className="container">
          <IconsGrid>
            {features.items.map(item => (
              <div className="icon-item">
                <NonStretchedImage
                  objectFit="contain"
                  alt=""
                  className="image"
                  {...item.icon}
                />
                <p className="small-paragraph heading">{item.heading}</p>
                <p className="small-paragraph">{item.description}</p>
              </div>
            ))}
          </IconsGrid>
        </div>
      </section>
      <section className="section has-dark-background about-page-primary">
        <div className="container">
          <PostContent
            content={content}
            className="content is-left-aligned links-are-buttons"
          />
        </div>
      </section>
    </StyledPartnershipPage>
  );
};

const PartnershipPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
    featuredimageSection,
    splitSection,
    features,
    partnering,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <PartnershipPagePrimaryTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredImage={featuredimage}
        featuredimageSection={featuredimageSection}
        splitSection={splitSection}
        features={features}
        partnering={partnering}
      />
    </Layout>
  );
};

export default PartnershipPage;

export const pageQuery = graphql`
  query PartnershipPagePrimaryTemplateById($id: String!) {
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
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
        featuredimageSection {
          content
          buttons {
            path
            text
          }
        }
        splitSection {
          subheading
          content
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
        features {
          content
          items {
            heading
            icon {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 100, quality: 50) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
            description
          }
        }
        partnering {
          heading
          subheading
          buttons {
            path
            text
          }
          items {
            logo {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 300, quality: 50) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
            content
          }
        }
      }
    }
  }
`;
