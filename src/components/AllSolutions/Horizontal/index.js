import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import HorizontalView from './Horizontal';

const HorizontalSection = props => {
  return (
    <StaticQuery
      query={graphql`
        query HorizontalSolutionsQuery {
          solutionItems: allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___title] }
            filter: {
              frontmatter: { templateKey: { regex: "/solution-page-/" } }
            }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  heading
                  featuredimage {
                    childImageSharp {
                      fluid(maxHeight: 404, quality: 50) {
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
      `}
      render={data => {
        if (data && data.solutionItems && data.solutionItems.edges)
          return <HorizontalView items={data.solutionItems.edges} {...props} />;
        return <></>;
      }}
    />
  );
};

export default HorizontalSection;
