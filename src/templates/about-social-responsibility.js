import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import NonStretchedImage from '../components/NonStretchedImage';
import SectionWith3Col from '../components/SectionWith3Col';
import SplittedSection from '../components/SplittedSection';
import ResponsibilityTabSection from '../components/ResponsibilityTabSection';
import { idMaker } from '../utils/id-maker';

import generateHTML from '../utils/generateHTML';

const gen = idMaker();

export const SocialResponsibilityPageTemplate = ({
  contentComponent,
  description,
  heading,
  imageList,
  splitSection,
  threeColSection,
  splitSection2,
  responsibilities,
  splitSection3,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="has-dark-background social-responsibility">
      <section className="section">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="section images">
        <div className="container">
          <ImageList images={imageList} />
        </div>
      </section>
      <SplittedSection
        className="section"
        leftColumn={
          <PostContent
            content={generateHTML(splitSection.left)}
            className="content"
          />
        }
        rightColumn={
          <PostContent
            content={generateHTML(splitSection.right)}
            className="content"
          />
        }
      />
      <SectionWith3Col
        columns={threeColSection}
        className="section has-light-dark-background three-col"
      />
      <SplittedSection
        shouldReorderOnMobile
        className="section is-medium"
        leftColumn={
          <PostContent
            content={generateHTML(splitSection2.left)}
            className="content"
          />
        }
        rightColumn={
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="image"
            {...splitSection2.right}
          />
        }
      />
      <ResponsibilityTabSection
        responsibilities={responsibilities.listItems}
        className="section has-light-dark-background"
      />
      <SplittedSection
        shouldReorderOnMobile
        className="section is-medium"
        leftColumn={
          <PostContent
            content={generateHTML(splitSection3.left)}
            className="content"
          />
        }
        rightColumn={
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="image"
            {...splitSection3.right}
          />
        }
      />
    </section>
  );
};

const ImageList = ({ images }) => {
  if (!images || images.length < 1 || !images[0].image) return <></>;
  return (
    <div className="wrapper">
      {images.map(imageObject => {
        return (
          <NonStretchedImage
            key={gen.next().value}
            objectFit="contain"
            alt=""
            className="image"
            {...imageObject.image}
          />
        );
      })}
    </div>
  );
};

const SocialResponsibilityPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    featuredImages,
    splitSection,
    threeColSection,
    splitSection2,
    responsibilities,
    splitSection3,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <SocialResponsibilityPageTemplate
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        imageList={featuredImages}
        splitSection={splitSection}
        threeColSection={threeColSection}
        splitSection2={splitSection2}
        responsibilities={responsibilities}
        splitSection3={splitSection3}
      />
    </Layout>
  );
};

export default SocialResponsibilityPage;

export const pageQuery = graphql`
  query SocialResponsibilityPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
        featuredImages {
          image {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 140, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        splitSection {
          left
          right
        }
        threeColSection {
          description
          icon {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 90, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        splitSection2 {
          left
          right {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        responsibilities {
          listItems {
            heading
            content
          }
        }
        splitSection3 {
          left
          right {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1100, quality: 100) {
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
