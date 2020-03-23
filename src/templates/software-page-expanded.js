import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import NonStretchedImage from '../components/NonStretchedImage';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Button from '../components/Button';
import RecentArticles from '../components/RecentArticles';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/Hero';
import CollapsibleWithImage from '../components/CollapsibleWithImage';
import trondheimOffice from '../img/trondheimOffice.png';

export const SoftwarePageTemplate = ({
  content,
  contentComponent,
  title,
  heading,
  subheading,
  image,
  expandableBoxes,
  description,
  freeText,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <SEO title={title} />
      <Hero
        heading={heading}
        subheading={subheading}
        gatsbyImageObject={image}
        buttonText="Kontakt oss"
        buttonPath="/kontakt"
      >
        <NonStretchedImage fluid={image} objectFit="contain" />
      </Hero>
      <section id="software-content" className="section is-medium has-dark-background">
        <div className="container">
          <div className="columns">
            <div className="column title">
              <p className="subtitle">{description.subheading}</p>
              <h2>{description.heading}</h2>
            </div>
            <div className="column is-7 content has-dark-background">
              <ReactMarkdown>{freeText}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      <CollapsibleWithImage
        collapsibleItems={expandableBoxes.boxes}
        className="has-dark-background is-medium"
      >
        <NonStretchedImage
          fluid={expandableBoxes.featuredimage.childImageSharp.fluid}
          objectFit="contain"
        />
      </CollapsibleWithImage>
      <section className="section has-dark-background free-text-centered">
        <div className="container">
          <PostContent content={content} />
        </div>
      </section>
      <section
        id="high-service"
        className="section is-large"
        style={{ backgroundImage: `url(${trondheimOffice})` }}
      >
          <div className="has-text-centered">
            <h3>Høy service med 24/7 support</h3>
            <p>
              Trenger du hjelp med noen av våre produkter? Eller bare litt info?
              Vi er her 24 timer i døgnet, 7 dager i uken for deg.
            </p>
            <Button text="Kontakt oss" className="is-primary large" link="/kontakt" />
          </div>
      </section>
    </>
  );
};

SoftwarePageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

const SoftwarePage = ({ data }) => {
  const { frontmatter, html } = data.index;

  return (
    <Layout>
      <SoftwarePageTemplate
        content={html}
        contentComponent={HTMLContent}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        expandableBoxes={frontmatter.expandableBoxes}
        image={frontmatter.featuredimage.childImageSharp.fluid}
        description={frontmatter.softwareDescription}
        freeText={frontmatter.freeText}
      />
      <RecentArticles />
    </Layout>
  );
};

SoftwarePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default SoftwarePage;

export const SoftwarePageQuery = graphql`
  query SoftwarePageExpanded($id: String!) {
    index: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        featuredimage {
          childImageSharp {
            fluid(maxHeight: 790) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
          }
        }
        heading
        subheading
        softwareDescription {
          heading
          subheading
        }
        expandableBoxes {
          featuredimage {
            childImageSharp {
              fluid(maxHeight: 1180) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
          boxes {
            heading
            description
          }
        }
        freeText
      }
    }
  }
`;
