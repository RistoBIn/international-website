import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Livestream from '../components/Livestream';
import Schedule from '../components/Schedule';

const LivestreamSection = styled.section`
  // padding-bottom: 0 !important;
  .container:first-of-type {
    padding-bottom: 70px;
  }
`;

export const TVChannelTemplate = ({
  content,
  contentComponent,
  description,
  heading,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="has-dark-background tv-channel">
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
      {/* <section className="section">
        <div className="container">
          <Schedule />
        </div>
      </section> */}
    </section>
  );
};

const TVChannel = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      seoDescription={post.frontmatter.seoDescription}
      seoTitle={post.frontmatter.title}
    >
      <TVChannelTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        heading={post.frontmatter.heading}
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
              ...GatsbyImageSharpFluid_noBase64
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
