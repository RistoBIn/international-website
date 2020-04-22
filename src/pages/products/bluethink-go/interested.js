import React from 'react';
import ContactFormProduct from '../../../components/ContactFormProduct';
import Layout from '../../../components/Layout';
import Title from '../../../components/Title';
import Hero from '../../../components/HeroBackgroundImage';
import backgroundImage from '../../../img/tablet-holding-portrait.jpg';

export const OrderProduct = () => {
  return (
    <>
      <Layout>
        <Hero
          heading="BlueThink™ GO - Report interest"
          subheading="The next generation of control room is mobile; report your interest today."
          backgroundImage={backgroundImage}
          buttonPath="#report-interest"
          buttonText="Report interest"
        />

        <section id="meld-interesse" className="section has-dark-background">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3 has-text-centered">
                <Title
                  title="Report interest"
                  description="Report your interest to be sent further information about the service, 
                              along with information about pricing. You will be contacted shortly after
                              the below form is filled out and sent."
                  position="center"
                />
                <ContactFormProduct
                  formName="bluethink-go"
                  action="/products/bluethink-go/thanks"
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default OrderProduct;
