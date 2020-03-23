import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
/* eslint-disable */ 
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Button from '../components/Button';
import BorderedContentSection from '../components/BorderedContentSection';
import BorderedBoxes from '../components/BorderedBoxes';
import QuoteSection from '../components/QuoteSection';

import NonStretchedImage from '../components/NonStretchedImage';

export const IndexPageTemplate = ({ heading, subheading, quote }) => (
  <section className="has-dark-background" />
);



IndexPageTemplate.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout
      seoDescription={frontmatter.seoDescription}
      seoTitle={frontmatter.title}
    >
      <IndexPageTemplate
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        product={frontmatter.productSection}
        quote={frontmatter.quote}
      />

    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        subheading
        seoDescription
        productSection {
          heading
          description
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
        quotes {
          authorName
          authorPosition
          quoteText
        }
      }
    }
  }
`;
