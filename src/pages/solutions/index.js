import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { CarouselItem } from '../../components/ImageBoxesWithNavigation';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();

const SolutionsPageTemplate = ({ nodeItems }) => {
  if (!nodeItems || nodeItems.length < 1)
    return (
      <Layout>
        <Section>
          <div className="content">
            <h1>Error!</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          </div>
        </Section>
      </Layout>
    );
  return (
    <Layout
      seoTitle="Solutions"
      seoDescription="SEALAB's products can be applied almost anywhere in the ocean. Find your solution here."
    >
      <Section>
        <h1 className="section--title">All solutions</h1>
        <p className="section--description">
          SEALAB's products can be applied almost anywhere. Find your solution
          here.
        </p>
      </Section>
      <Section>
        <Wrapper>
          {nodeItems.map(node => {
            const { frontmatter, fields } = node.node;
            return (
              <CarouselItem
                key={gen.next().value}
                heading={frontmatter.heading}
                featuredimage={frontmatter.featuredimage}
                path={fields.slug}
                className="item"
              />
            );
          })}
        </Wrapper>
      </Section>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, [col] 440px);
  grid-gap: 20px;
  //   .item {
  //     height: 404px;
  //     width: 440px;
  //   }
`;

const Section = ({ children }) => (
  <section className="section has-dark-background">
    <div className="container">{children}</div>
  </section>
);
/* eslint-disable */
const SolutionsPage = ({ props }) => {
  return (
    <StaticQuery
      query={graphql`
        query SolutionsQuery {
          solutionItems: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___title] }
            filter: {
              frontmatter: {
                templateKey: { regex: "/solution-page-/" }
              }
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
          return (
            <SolutionsPageTemplate
              nodeItems={data.solutionItems.edges}
              {...props}
            />
          );
        return <></>;
      }}
    />
  );
};

export default SolutionsPage;
