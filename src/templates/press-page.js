import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import HeroFaded from '../components/HeroBackgroundImageFaded';
import NonStretchedImage from '../components/NonStretchedImage';
import generateHTML from '../utils/generateHTML';
import { idMaker } from '../utils/id-maker';

const gen = idMaker();

const StyledPressPage = styled.section`
  @media only screen and (max-width: 768px) {
    section.pre-history {
      padding-bottom: 0;
      .centered .content h2 {
        text-align: left;
        margin-left: 0;
      }
    }
  }
`;

export const PressPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <StyledPressPage className="has-dark-background">
      {content ? (
        <section className="section has-dark-background pre-history">
          <div className="container centered">
            <PostContent content={content} className="content" />
          </div>
        </section>
      ) : (
        <></>
      )}
    </StyledPressPage>
  );
};

const PressPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    guidelines,
    subPages,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <PressPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        guidelines={guidelines}
        subPages={subPages}
      />
    </Layout>
  );
};

export default PressPage;

export const pageQuery = graphql`
  query PressPagePrimaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        seoDescription
        description
        guidelines
        subPages {
          heading
          files {
            displayName
            dimensions
            backgroundColor
            path {
              extension
              size
              publicURL
            }
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 320, quality: 60) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`;
