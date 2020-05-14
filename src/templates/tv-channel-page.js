import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Livestream from '../components/Livestream';
import Schedule from '../components/Schedule';
import SplittedSection from '../components/SplittedSection';
import NonStretchedImage from '../components/NonStretchedImage';
import generateHTML from '../utils/generateHTML';

const TVChannelSection = styled.section`
  h2 {
    padding-top: 50px;
  }
  .section.cta {
    padding: 0;
  }
`;

const LivestreamSection = styled.section`
  padding-bottom: 0 !important;
  .container:first-of-type {
    padding-bottom: 70px;
  }
`;

export const TVChannelTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  featuredimage,
  splitSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <TVChannelSection className="has-dark-background tv-channel">
      <LivestreamSection className="section is-medium has-dark-background">
        <div className="container centered">
          <h1 className="section--title has-text-centered">{heading}</h1>
          <p className="section--description has-text-centered">
            {description}
          </p>
        </div>
        <div className="container">
          <Livestream />
        </div>
      </LivestreamSection>
      <section className="section">
        <div className="container">
          <Schedule />
        </div>
      </section>
      <section className="section cta">
        <div className="container centered">
          <a
            className="button is-primary "
            target="_blank"
            rel="noopener noreferrer"
            href="http://sealab.live/"
          >
            See a demo of BlueThink GO
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {featuredimage ? (
            <NonStretchedImage
              fluid={featuredimage.childImageSharp.fluid}
              objectFit="contain"
              alt=""
              className="image"
            />
          ) : (
            <></>
          )}
          {splitSection ? (
            <>
              <h2>{splitSection.heading}</h2>
              <SplittedSection
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
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
      {content ? (
        <section className="section">
          <div className="container">
            <PostContent content={content} className="content" />
          </div>
        </section>
      ) : (
        <></>
      )}
    </TVChannelSection>
  );
};

const TVChannel = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
    splitSection,
  } = frontmatter;

  return (
    <Layout seoDescription={seoDescription} seoTitle={title}>
      <TVChannelTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={description}
        heading={heading}
        featuredimage={featuredimage}
        splitSection={splitSection}
      />
    </Layout>
  );
};

export default TVChannel;

export const pageQuery = graphql`
  query TVChannelById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        heading
        seoDescription
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
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
