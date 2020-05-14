import React, { Component } from 'react';
import { navigate } from 'gatsby-link';
import styles from './ContactFormProduct.module.scss';
import ArrowRight from '../../img/Arrow.inline.svg';

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default class ContactFormProduct extends Component {
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
    /* eslint-disable */
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

    /* eslint-enable */
  };

  render() {
    const { action, formName } = this.props;
    return (
      <>
        <form
          className={styles.form}
          name={formName}
          method="post"
          action={action}
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
            <label className="label" htmlFor="company">
              Company
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="company"
                onChange={this.handleChange}
                id="company"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="location">
              Location name
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="location"
                onChange={this.handleChange}
                id="location"
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
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
            <label className="label" htmlFor="mobile">
              Mobile number
            </label>
            <div className="control">
              <input
                className="input"
                type="tel"
                name="mobile"
                onChange={this.handleChange}
                id="mobile"
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
      </>
    );
  }
}
