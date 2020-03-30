import React from 'react';
​
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
​
export const AboutPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
}) => {
  const PostContent = contentComponent || Content;
​
  return (
    <section className="section has-dark-background">
      <div className="container">
        <h1>{heading}</h1>
        <p>{description}</p>
        <p>This is product-page-secondary</p>
        <PostContent content={content} />
      </div>
    </section>
  );
};
​
const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const { title, seoDescription, heading, description } = frontmatter;
​
  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
      />
    </Layout>
  );
};
​
export default ProductPage;
​
export const pageQuery = graphql`
  query AboutPageTertiaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
      }
    }
  }
`;