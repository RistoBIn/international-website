import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import PieChartShareholders from '../components/PieChartShareholders';
import generateHTML from '../utils/generateHTML';
import SplittedSection from '../components/SplittedSection';
import Button from '../components/Button';
import PercentageItems from '../components/PercentageItems';
import NonStretchedImage from '../components/NonStretchedImage';
import ShareHolderTable from '../components/ShareHolderTable';
import { HorizontalView as SolutionsHorizontalSection } from '../components/AllSolutions';

const PieChartSection = styled.section`
  padding: 3rem 0;
  @media only screen and (min-width: 1468px) {
    background-image: url('/img/hidden/cloud-and-shareholders.jpg') !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    background-position: center !important;
  }
`;

const FinancialSection = styled.section`
  h2 {
    margin-bottom: 0 !important;
  }
  @media only screen and (min-width: 768px) {
    .percentage-column {
      padding-right: 0;
    }
  }
`;

const ThirdPartySection = styled.section`
  .content {
    h2 {
      font-size: 56px;
    }
    .button {
      margin-top: 30px !important;
    }
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  grid-gap: 30px 60px;
  padding-top: 5rem;
  .image-item {
    margin: auto;
  }
`;

const ButtonFlex = styled.div`
  .button {
    margin-top: 20px;
  }
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-gap: 12px;
  }
`;

const TableHeaders = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 8px;
  padding-bottom: 60px;

  .table-header {
    padding: 10px 16px;
    p {
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 28px;
    }
    h3 {
      font-weight: 300;
    }
  }
`;

export const InvestorPageTemplate = ({
  contentComponent,
  heading,
  description,
  featuredimage,
  featuredimageCaption,
  shareholders,
  highlights,
  partners,
  splitSection,
  table,
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
      <PieChartSection className="section has-dark-background piechart">
        <PieChartShareholders items={shareholders} />
      </PieChartSection>
      <FinancialSection className="section has-dark-background">
        <div className="container">
          <SplittedSection
            leftColumn={
              <>
                <PostContent
                  content={generateHTML(highlights.content)}
                  className="content left"
                />
                <Button
                  className="is-primary"
                  text={highlights.button.text}
                  path={highlights.button.path}
                />
              </>
            }
            rightColumnCSS="percentage-column"
            rightColumn={
              <PercentageItems
                items={highlights.items}
                className="has-light-dark-background"
              />
            }
          />
        </div>
      </FinancialSection>
      <section className="section has-dark-background vision-strategy">
        <div className="container">
          <figure className="figure">
            <Img
              fluid={featuredimage.childImageSharp.fluid}
              alt="SEALAB leadership"
              className="image"
            />
            {featuredimageCaption ? (
              <figcaption className="caption">
                {featuredimageCaption}
              </figcaption>
            ) : (
              <></>
            )}
          </figure>
        </div>
      </section>
      <ThirdPartySection className="section has-dark-background vision-strategy">
        <div className="container content centered-free-text">
          <PostContent content={generateHTML(partners.content)} />
          {partners.button ? (
            <Button
              className="is-primary"
              text={partners.button.text}
              path={partners.button.path}
            />
          ) : (
            <></>
          )}
          <ImageGrid>
            {partners.logos.map(imageItem => (
              <NonStretchedImage
                objectFit="contain"
                alt=""
                className="image image-item"
                {...imageItem.image}
              />
            ))}
          </ImageGrid>
        </div>
      </ThirdPartySection>
      <section className="section has-dark-background">
        <div className="container">
          <SplittedSection
            leftColumn={
              <>
                <h2>{splitSection.heading}</h2>
                <PostContent
                  content={generateHTML(splitSection.left)}
                  className="content left"
                />
                <ButtonFlex>
                  {splitSection.buttons.map(buttonObject => (
                    <Button
                      className="is-transparent"
                      text={buttonObject.text}
                      path={buttonObject.path}
                    />
                  ))}
                </ButtonFlex>
              </>
            }
            rightColumn={
              <>
                <h2 aria-hidden="true">
                  <br />
                  <br />
                </h2>
                <PostContent
                  content={generateHTML(splitSection.right)}
                  className="content left"
                />
              </>
            }
          />
        </div>
      </section>
      <section className="section has-dark-background">
        <div className="container">
          <PostContent
            content={generateHTML(table.content)}
            className="content centered-free-text"
          />
          <TableHeaders>
            {table.boxes.map(boxItem => (
              <div className="table-header has-light-dark-background">
                <p>{boxItem.heading}</p>
                <h3>{boxItem.description}</h3>
              </div>
            ))}
          </TableHeaders>

          <ShareHolderTable shareholders={shareholders} />
        </div>
      </section>
      <SolutionsHorizontalSection />
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
    featuredimageCaption,
    shareholders,
    highlights,
    partners,
    splitSection,
    table,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <InvestorPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        featuredimageCaption={featuredimageCaption}
        shareholders={shareholders}
        highlights={highlights}
        partners={partners}
        splitSection={splitSection}
        table={table}
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
        featuredimageCaption
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
        highlights {
          button {
            text
            path
          }
          content
          items {
            content
            percentage
          }
        }
        partners {
          content
          logos {
            image {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 250, quality: 50) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
          }
          button {
            text
            path
          }
        }
        splitSection {
          buttons {
            text
            path
          }
          heading
          left
          right
        }
        table {
          content
          boxes {
            heading
            description
          }
        }
        presentations {
          heading
          items {
            file {
              publicURL
            }
            heading
            description
            icon {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 250, quality: 50) {
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
