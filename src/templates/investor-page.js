import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import PieChartShareholders from '../components/PieChartShareholders';
import generateHTML from '../utils/generateHTML';

export const InvestorPageTemplate = ({
  contentComponent,
  heading,
  description,
  featuredimage,
  shareholders,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background investors">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="section has-dark-background investors piechart">
        <PieChartShareholders items={shareholders} />
      </section>
    </>
  );
};

const InvestorPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
    shareholders,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <InvestorPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        shareholders={shareholders}
      />
    </Layout>
  );
};

export default InvestorPage;

export const pageQuery = graphql`
  query InvestorPageTemplateById($id: String!) {
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
        shareholders {
          name
          shares
          percentage
          country
          accountType
        }
      }
    }
  }
`;
