import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import NonStretchedImage from '../components/NonStretchedImage';
import { idMaker } from '../utils/id-maker';
import generateHTML from '../utils/generateHTML';

const gen = idMaker();

export const AboutPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredimage,
  persons,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background about-page-leadership">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      {featuredimage ? (
        <section className="section has-dark-background about-page-leadership">
          <div className="container">
            <NonStretchedImage
              fluid={featuredimage.childImageSharp.fluid}
              objectFit="contain"
              alt="SEALABs leadership"
              className="image"
            />
          </div>
        </section>
      ) : (
        <></>
      )}
      {persons && persons.length > 0 ? (
        <section className="section has-dark-background about-page-leadership">
          <div className="container">
            <div className="wrapper">
              {persons.map(person => {
                return (
                  <Person
                    key={gen.next().value}
                    image={person.profilePicture}
                    name={person.name}
                    description={person.description}
                    role={person.role}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
      <section className="section has-dark-background about-page-leadership">
        <div className="container">
          <PostContent content={content} className="content" />
        </div>
      </section>
    </>
  );
};

const Person = ({ image, name, role, description }) => {
  if (!image || !name || !role || !description) return <></>;
  const PostContent = HTMLContent || Content;

  return (
    <div className="person">
      <div className="person--heading">
        <NonStretchedImage
          fluid={image.childImageSharp.fluid}
          objectFit="contain"
          alt={name}
          className="image"
        />
        <p className="role">{role}</p>
        <h2 className="name">{name}</h2>
      </div>

      <PostContent
        content={generateHTML(description)}
        className="content description"
      />
    </div>
  );
};

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
    persons,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        persons={persons}
      />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query aboutPageTertiaryTemplateById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        seoDescription
        heading
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1410, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        persons {
          description
          name
          role
          profilePicture {
            childImageSharp {
              fluid(maxWidth: 70, quality: 80) {
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
