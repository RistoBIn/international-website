import React from 'react';
import classNames from 'classnames';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SectionList from '../components/SectionList';
import SplittedSection from '../components/SplittedSection';
import LargeImageWithSplitSection from '../components/LargeImageWithSplitSection';
import BorderedContentSection from '../components/BorderedContentSection';
import BackgroundImage from '../components/BackgroundImage';
import CheckList from '../components/CheckList';
import AdvantagesList from '../components/AdvantagesList'
import LinkButtons from '../components/LinkButtons'
import ReadMoreIcon from '../img/readmore-arrow.inline.svg';
import ArrowRight from '../img/Arrow.inline.svg';
import generateHTML from '../utils/generateHTML';

export const LandBasedFishFarmingPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  featuredimage,
  seaToLandSection,
  featureSection,
  advantageSection,
  scamSection,
  middleImage,
  controlSection,
  imageSplitSections,
  middleDescription,
  settingSection,
  getStartSection,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="solution-page-primary solution-page has-dark-background">
      <Hero
        className="is-large"
        heading={heading}
        description={description}
        image={featuredimage}
        anchorLink="#first-section"
      />
      <section id="read-more" className="section" aria-hidden="true">
        <div className="container">
          <AnchorLink
            href="#first-section"
            className={classNames('read-more-button')}
          >
            <ReadMoreIcon />
          </AnchorLink>
        </div>
      </section>
      <section id="first-section"  className="section">
        <div className="container">
          <div className="columns is-vcentered reverse-row-order">
            <div className="column">
              <p className="section--subheading">{seaToLandSection.label}</p>
              <h2 className="section--title">{seaToLandSection.heading}</h2>
              <HTMLContent content={seaToLandSection.description} />
            </div>
            <div className="column">
              <Img className="side-image" fluid={seaToLandSection.sideImage.childImageSharp.fluid} />
            </div>
          </div>          
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="column center-align-wrapper">
            <p className="section--subheading">{featureSection.label}</p>
            <h2 className="section--title">{featureSection.heading}</h2>
            <HTMLContent className="description" content={featureSection.description} />
            <CheckList data={featureSection.features} />
          </div>    
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row">
            <p className="section--subheading has-text-centered">{advantageSection.label}</p>
          </div>
          <AdvantagesList data={advantageSection.advantages} /> 
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered reverse-row-order">
            <div className="column">
              <p className="section--subheading">{scamSection.label}</p>
              <h2 className="section--title">{scamSection.heading}</h2>
              <HTMLContent content={scamSection.content} />
              <LinkButtons data={scamSection.linkButtons} />
            </div>
            <div className="column">
              <Img className="side-image" fluid={scamSection.sideImage.childImageSharp.fluid} />
            </div>
          </div>          
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Img fluid={middleImage.childImageSharp.fluid} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <p className="section--subheading">{controlSection.label}</p>
              <h2 className="section--title">{controlSection.heading}</h2>
            </div>
            <div className="column">
              <HTMLContent content={controlSection.content} />
              <LinkButtons data={controlSection.linkButtons} />
            </div>
          </div>          
        </div>
      </section>
      {
        imageSplitSections.map((data, i)=>{
          if (i%2===0) {
            return(
              <section className="section">
                <div className="container">
                  <div className="columns is-vcentered reverse-row-order">
                    <div className="column">
                      <p className="section--subheading">{data.label}</p>
                      <h2 className="section--title">{data.heading}</h2>
                      <HTMLContent content={data.content} />
                      <LinkButtons data={data.linkButtons} />
                    </div>
                    <div className="column">
                      <Img className="side-image" fluid={data.sideImage.childImageSharp.fluid} />
                    </div>
                  </div>          
                </div>
              </section>
            )
          } else {
            return(
              <section className="section">
                <div className="container">
                  <div className="columns is-vcentered">
                    <div className="column">
                      <Img className="side-image" fluid={data.sideImage.childImageSharp.fluid} />
                    </div>
                    <div className="column">
                      <p className="section--subheading">{data.label}</p>
                      <h2 className="section--title">{data.heading}</h2>
                      <HTMLContent content={data.content} />
                      <LinkButtons data={data.linkButtons} />
                    </div>
                  </div>          
                </div>
              </section>
            )
          }
        })
      }
      <section className="section">
        <div className="container ">
          <div className="middle-description">
            "{middleDescription}"
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered reverse-row-order">
            <div className="column">
              <h2 className="section--title">{settingSection.heading}</h2>
              <HTMLContent content={settingSection.content} />
              <LinkButtons data={settingSection.linkButtons} />
            </div>
            <div className="column">
              <Img className="side-image" fluid={settingSection.sideImage.childImageSharp.fluid} />
            </div>
          </div>          
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row">
            <Img className="is-mobile-hidden" fluid={getStartSection.topImage.childImageSharp.fluid} />
            <Img className="is-mobile-show" fluid={getStartSection.mobileTopImage.childImageSharp.fluid} />
          </div>
          <div className="row center-align-wrapper">
            <h2 className="section--title">{getStartSection.heading}</h2>
            <HTMLContent content={getStartSection.description} />
            <button className="button is-primary">
              <Link to={getStartSection.buttonLink}>
                <span>{getStartSection.buttonTxt}</span>
                <span className="icon is-small">
                  <ArrowRight />
                </span>
              </Link>
            </button>
          </div>      
        </div>
      </section>
    </section>
  );
};

const Hero = ({ className, heading, description, image }) => {
  return (
  <div>
    <BackgroundImage
      className={classNames('hero', className)}
      image={image}
      filterStyle={{
        background:
          'linear-gradient(358.35deg, #0E111B 4.06%, rgba(14, 17, 27, 0.21) 34.1%), linear-gradient(0deg, rgba(14, 17, 27, 0.3), rgba(14, 17, 27, 0.3))',
      }}
      style={{
        backgroundPosition: 'bottom center !important',
        minHeight: "320px",
      }}
    >
      <div className={classNames('hero-body is-mobile-hidden')}>
        <div className="container">
          <div className="row">
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </BackgroundImage>
    <section className="section is-mobile-show">
      <div className="container">
        <div className="row">
          <h1>{heading}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  </div>
  );
};

const LandBasedFishFarmingPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    featuredimage,
    seaToLandSection,
    featureSection,
    advantageSection,
    scamSection,
    middleImage,
    controlSection,
    imageSplitSections,
    middleDescription,
    settingSection,
    getStartSection,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <LandBasedFishFarmingPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        seaToLandSection={seaToLandSection}
        featureSection={featureSection}
        advantageSection={advantageSection}
        scamSection={scamSection}
        middleImage={middleImage}
        controlSection={controlSection}
        imageSplitSections={imageSplitSections}
        middleDescription={middleDescription}
        settingSection={settingSection}
        getStartSection={getStartSection}
      />
    </Layout>
  );
};

export default LandBasedFishFarmingPage;

export const pageQuery = graphql`
  query LandBasedFishFarmingPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "land-based-fish-farming" } }) {
      id
      html
      frontmatter {
        title
        heading
        seoDescription
        description
        featuredimage {
          publicURL
          extension
          childImageSharp {
            fluid(maxHeight: 630, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        seaToLandSection {
          label
          heading
          description
          sideImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 388, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        featureSection {
          label
          heading
          description
          features {
            feature
          }
        }
        advantageSection {
          label 
          advantages {
            advantage
            featuredimage {
              publicURL
              extension
              childImageSharp {
                fluid(maxHeight: 92, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                  presentationWidth
                }
              }
            }
          }
        }
        scamSection {
          label
          heading
          content
          linkButtons {
            buttonTxt
            buttonLink
          }
          sideImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 494, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        middleImage {
          publicURL
          extension
          childImageSharp {
            fluid(maxHeight: 584, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        controlSection {
          label
          heading
          content
          linkButtons {
            buttonTxt
            buttonLink
          }
        }
        imageSplitSections {
          label
          heading
          content
          linkButtons {
            buttonTxt
            buttonLink
          }
          sideImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 582, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        middleDescription
        settingSection {
          heading
          content
          linkButtons {
            buttonTxt
            buttonLink
          }
          sideImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 489, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
        getStartSection {
          heading
          description
          buttonTxt
          buttonLink
          topImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 491, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
          mobileTopImage {
            publicURL
            extension
            childImageSharp {
              fluid(maxHeight: 560, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
