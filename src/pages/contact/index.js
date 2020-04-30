import React from 'react';
import { navigate } from 'gatsby-link';
import Layout from '../../components/Layout';
import ArrowRight from '../../img/Arrow.inline.svg';
import EmailIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidated: false,
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout
        seoTitle="Contact us"
        seoDescription="Contact us today for a demo of our products, or just a nice chat about technology. You can contact us by email: contact@sealab.no, or phone: +47 729 09 111. We're looking forward to hear from you."
      >
        <section id="contact-form" className="section is-medium">
          <div className="container">
            <div className="content">
              <div className="columns">
                <div className="column is-4">
                  <h1>Contact</h1>
                  <h2>
                    Please fill out the contact form, and we will contact you as
                    fast as we can.
                  </h2>
                  <div className="contact-information wrapper">
                    <ContactInformation title="E-mail" Icon={EmailIcon}>
                      <a href="mailto:contact@sealab.no">contact@sealab.no</a>
                    </ContactInformation>
                    <ContactInformation title="Phone" Icon={PhoneIcon}>
                      <a href="tel:+4772909111">+47 729 09 111</a>
                    </ContactInformation>
                    <div className="contact-information-item">
                      <h4 className="subtitle">Address</h4>

                      <div className="contact-information-item-content">
                        <p>Transittgata 14, entrance A </p>
                        <p>7042, Trondheim</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="form" className="column is-6 is-offset-1">
                  <form
                    name="contact-international"
                    method="post"
                    action="/contact/thanks"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <label htmlFor="bot-field">
                        Don’t fill this out:{' '}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="name">
                        Name
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          onChange={this.handleChange}
                          id="name"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="email">
                        E-mail
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          name="email"
                          onChange={this.handleChange}
                          id="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="message">
                        Message
                      </label>
                      <div className="control">
                        <textarea
                          className="textarea"
                          name="message"
                          onChange={this.handleChange}
                          id="message"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-primary" type="submit">
                        <span>Send</span>
                        <span className="icon is-small">
                          <ArrowRight />
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const ContactInformation = ({ title, Icon, children }) => (
  <div className="contact-information-item">
    <h4 className="subtitle">{title}</h4>
    <Icon />
    <div className="contact-information-item-content">{children}</div>
  </div>
);
