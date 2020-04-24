import React, { useState } from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import NonStretchedImage from '../components/NonStretchedImage';
import generateHTML from '../utils/generateHTML';
import { idMaker } from '../utils/id-maker';
import filesizeConverter from '../utils/filesize-converter';
import Checkmark from '../img/icon-checkmark.inline.svg';
import DownloadIcon from '../img/icon-download.inline.svg';

const gen = idMaker();

const StyledPressPage = styled.section`
  section.files {
    background-color: black;
  }
`;

const Guidelines = styled.div`
  padding-bottom: 3rem;
  .guideline-item {
    display: flex;
    height: auto;
    margin: 10px 4px;
    margin-top: 0;
    padding: 10px 15px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.1);
    svg,
    p {
      display: inline-flex;
      margin: auto 0;
      font-weight: bold;
      color: white;
    }
    svg {
      margin-right: 15px;
    }
  }
  @media only screen and (min-width: 868px) {
    display: flex;
  }
`;

const Flex = styled.div`
  display: flex;
  & > * {
    margin: auto 0;
    margin-right: 15px;
  }
`;

export const PressPageTemplate = ({
  contentComponent,
  description,
  heading,
  guidelines,
  subPages,
}) => {
  const PostContent = contentComponent || Content;

  const [activeIndex, setActiveIndex] = useState(0);
  const headings = subPages.map(item => {
    return item.heading;
  });

  const onClick = index => {
    setActiveIndex(index);
  };

  return (
    <StyledPressPage className="has-dark-background">
      <section className="section has-dark-background pre-history">
        <div className="container centered">
          <h1>{heading}</h1>
          <PostContent
            content={generateHTML(description)}
            className="content"
          />
        </div>
      </section>
      {guidelines ? (
        <div className="container centered">
          <Guidelines>
            {guidelines.map(guidelineText => (
              <div key={gen.next().value} className="guideline-item">
                <Checkmark />
                <p>{guidelineText}</p>
              </div>
            ))}
          </Guidelines>
        </div>
      ) : (
        <></>
      )}
      <FileNavigation
        activeIndex={activeIndex}
        onClick={onClick}
        headings={headings}
      />
      <section className="section files">
        <FileView items={subPages[activeIndex].files} />
      </section>
    </StyledPressPage>
  );
};

const StyledFileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 330px));
  grid-gap: 20px;
  margin: 0 auto;
  .card-item {
    max-height: 355px;
    background-color: #1f2331;
    transition: all 0.5s ease;
    div.image-wrapper {
      width: 100%;
      height: 203px;
      max-height: 203px;
      overflow: hidden;
      display: table;
      figure {
        max-height: 203px;
        width: 100%;
        display: table-cell;
        vertical-align: middle;
        overflow: hidden;
        .image {
          margin: auto;
          max-height: 203px;
          overflow: hidden;
        }
        &.is-fullheight {
          background-color: #1f2331;
        }
      }

      &.is-light {
        background-color: #f4f5f8;
      }
      &.is-dark {
        background-color: #0e111b;
      }
    }
    h3 {
      font-size: 18px;
      font-weight: bold;
      padding: 19px 0 15px 0;
      margin: 0;
    }
    .text {
      height: 152px;
      padding: 15px 16px 16px 13px;
      color: #dbe0ea;
      font-size: 14px;
      .size-type {
        p strong {
          text-transform: uppercase;
          padding-left: 6px;
        }
      }
    }
    &:hover,
    &:focus {
      filter: brightness(1.5);
    }
  }
  @media only screen and (max-width: 868px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 350px));
    grid-gap: 10px;
    .text {
      padding: 10px 15px;
      color: #dbe0ea;
      font-size: 14px;
      .size-type {
        p strong {
          text-transform: uppercase;
          padding-left: 6px;
        }
      }
    }
  }
  @media only screen and (min-width: 768px) {
    min-height: 800px;
  }
`;

const FileView = ({ items }) => {
  return (
    <div className="container">
      <StyledFileGrid>
        {items.map(fileItem => {
          return (
            <a
              key={gen.next().value}
              href={fileItem.path.publicURL}
              download
              className="card-item"
            >
              <div
                className={classNames(
                  'image-wrapper',
                  `is-${fileItem.backgroundColor}`,
                )}
              >
                <figure
                  className={classNames({
                    'is-fullheight': fileItem.isImageFullwidth,
                  })}
                >
                  {fileItem.isImageFullwidth ? (
                    <NonStretchedImage
                      objectFit="contain"
                      fluid={
                        fileItem.path.fullwidth
                          ? fileItem.path.fullwidth.fluid
                          : undefined
                      }
                      alt=""
                      className="image image-item"
                      style={{ margin: 'auto !important' }}
                      {...fileItem.path}
                    />
                  ) : (
                    <NonStretchedImage
                      objectFit="contain"
                      fluid={
                        fileItem.path.regular
                          ? fileItem.path.regular.fluid
                          : undefined
                      }
                      alt=""
                      className="image image-item"
                      style={{ margin: 'auto !important' }}
                      {...fileItem.path}
                    />
                  )}
                </figure>
              </div>
              <div className="text">
                <Flex>
                  <p>
                    <strong>Download</strong>
                  </p>
                  <DownloadIcon />
                </Flex>
                <h3>{fileItem.displayName}</h3>
                <Flex className="size-type">
                  <p>
                    Size:
                    <strong>{filesizeConverter(fileItem.path.size)}</strong>
                  </p>
                  <p>
                    Type: <strong>{fileItem.path.extension}</strong>
                  </p>
                </Flex>
                {fileItem.dimensions ? (
                  <p>
                    Dimensions: <strong>{fileItem.dimensions}</strong>
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </a>
          );
        })}
      </StyledFileGrid>
    </div>
  );
};

const StyledFileNavigation = styled.nav`
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .link {
    padding: 20px 30px;
    font-family: Ubuntu;
    font-size: 16px;
    background: transparent;
    color: white;
    border: none;
    outline: transparent;
    cursor: pointer;
    transition: all 0.25s ease;
    border-bottom: 2px solid transparent;
    &.is-active {
      background-color: rgba(255, 255, 255, 0.1);
      border-bottom: 2px solid white;
    }
  }
`;

const FileNavigation = ({ headings, activeIndex, onClick }) => {
  if (!headings || headings.length < 1 || !headings[0]) return <></>;
  return (
    <StyledFileNavigation>
      <div className="container centered">
        {headings.map((navigationItem, index) => (
          <button
            key={gen.next().value}
            onClick={() => onClick(index)}
            className={classNames('link', {
              'is-active': activeIndex === index,
            })}
            type="button"
          >
            {navigationItem}
          </button>
        ))}
      </div>
    </StyledFileNavigation>
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
            isImageFullwidth
            path {
              extension
              size
              publicURL
              regular: childImageSharp {
                fluid(maxHeight: 148, quality: 60) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
              fullwidth: childImageSharp {
                fluid(maxWidth: 350, maxHeight: 220, quality: 70) {
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
