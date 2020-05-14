import React from 'react';
import Layout from '../../components/Layout';
import { GridView } from '../../components/AllSolutions';

const SolutionsPageTemplate = () => {
  return (
    <Layout
      seoTitle="Solutions"
      seoDescription="SEALAB's products can be applied almost anywhere in the ocean. Find your solution here."
    >
      <Section>
        <h1 className="section--title">All solutions</h1>
        <p className="section--description">
          SEALAB&apos;s products can be applied almost anywhere. Find your
          solution here.
        </p>
      </Section>
      <Section>
        <GridView />
      </Section>
    </Layout>
  );
};

const Section = ({ children }) => (
  <section className="section has-dark-background">
    <div className="container">{children}</div>
  </section>
);

export default SolutionsPageTemplate;
