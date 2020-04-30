import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import SealabLogo from '../../img/logo.inline.svg';
import MailIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';
import Button from '../Button';
// import { cleanPath } from '../../utils/paths';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();
const year = new Date().getFullYear();

const StyledFooter = styled.footer`
  background: none;
  margin: 0;
  padding: 0;
  .has-dark-background {
    background-color: $footer-background;

    a,
    p {
      font-weight: 600;
      line-height: 220%;
      color: $white;
    }
  }
  section#book-demo {
    border-top: 1px solid $border-dark-background;
    .cta {
      margin-left: auto;
      margin-right: 0;
    }
    h3 {
      color: $white;
      font-weight: 600;
      font-size: 18px;
      &.is-red {
        font-weight: bold;
        text-transform: none;
      }
    }
    .contact-info {
      p {
        margin: auto 0;
        vertical-align: middle;
        font-weight: 600;
        span {
          padding-right: 22px;
          margin: auto 0;
          svg {
            margin: auto;
            height: 18px;
            width: 18px;
          }
        }
      }
    }

    .text {
      padding-right: 20px;
    }
    @media only screen and (min-width: $desktop) {
      .cta {
        text-align: right;
        display: flex;
        .text,
        .button {
          margin: auto;
          margin-right: 0;
          margin-bottom: 0;
        }
        .button {
          max-width: 180px;
          margin-left: 0;
          align-self: flex-end;
          line-height: 1em;
        }
      }
    }
  }
  section#company-information,
  section#footer-navigation {
    h3 {
      font-family: $primaryFont;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: $white;
      opacity: 0.5;
      margin-bottom: 20px;
    }
  }
  section#copyright {
    border-top: 1px solid $border-dark-background;
    text-align: center;
    svg {
      max-width: 300px;
      margin: auto 0;
    }
    .copyright-text {
      margin: auto 0;
      p {
        font-size: 14px;
        line-height: 19px;
        color: $grey-light;
        opacity: 0.5;
        padding-bottom: 24px;
      }
      a {
        font-size: 14px;
        line-height: 19px;
      }
    }
    @media only screen and (min-width: $desktop) {
      display: flex;
      .copyright-text {
        align-self: flex-end;
        margin-left: auto;
        display: inline-flex;
        & > * {
          padding: 0 20px;
        }
        p {
          padding-bottom: 0px;
        }
      }
    }
  }
`;

const Footer = ({ phone, email, callToAction, companyOffices }) => {
  return (
    <StyledFooter className="footer">
      <div className="has-dark-background">
        <div className="container">
          {/* <section id="footer-navigation" className="section is-small">
            <div className="columns is-multiline">
              <List title="Solutions" navigationItems={mainNavigation} />
              <List title="Products" navigationItems={secondaryNavigation} />
              <List title="Projects" navigationItems={thirdNavigation} />
              <List title="About" navigationItems={fourthNavigation} />
            </div>
          </section> */}
          <section id="company-information" className="section is-small">
            <div className="columns">
              {companyOffices.map(office => (
                <div key={gen.next().value} className="column is-3">
                  <h3>{office.title}</h3>
                  <StringList items={office.addressItems} />
                </div>
              ))}
            </div>
          </section>
          <section id="book-demo" className="section is-small">
            <div className="columns">
              <div className="column is-3 contact-info">
                <h3 className="is-red">Contact</h3>
                <a href={`mailto:${email}`}>
                  <span>
                    <MailIcon />
                  </span>
                  {email}
                </a>
                <p>
                  <span>
                    <PhoneIcon />
                  </span>
                  {phone}
                </p>
              </div>
              <div className="column cta is-9">
                <div className="text">
                  <h3>{callToAction.title}</h3>
                  <p>{callToAction.description}</p>
                </div>
                <Button
                  text={callToAction.buttonText}
                  className="is-primary medium"
                  path={callToAction.buttonPath}
                />
              </div>
            </div>
          </section>
          <section id="copyright" className="section is-small">
            <SealabLogo />
            <div className="copyright-text">
              <p>Copyright © SEALAB AS {year}</p>
              <Link to="/privacy-policy/">Privacy Policy</Link>
            </div>
          </section>
        </div>
      </div>
    </StyledFooter>
  );
};

const StringList = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={gen.next().value}>
        <p>{item}</p>
      </li>
    ))}
  </ul>
);

// const List = ({ title, navigationItems }) =>
//   navigationItems.length <= 4 ? (
//     <div className="column is-3">
//       <h3>{title}</h3>
//       <ul>
//         {navigationItems.map(item => (
//           <li key={gen.next().value}>
//             {item.path ? (
//               <Link to={cleanPath(item.path)}>{item.title}</Link>
//             ) : (
//               <p>{item}</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   ) : (
//     <>
//       <div className="column is-3">
//         <h3>{title}</h3>
//         <ul>
//           {navigationItems.slice(0, 4).map(item => (
//             <li key={gen.next().value}>
//               {item.path ? (
//                 <Link to={cleanPath(item.path)}>{item.title}</Link>
//               ) : (
//                 <p>{item}</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="column is-3">
//         <h3 role="presentation" className="is-hidden-mobile">
//           <br />
//         </h3>
//         <ul>
//           {navigationItems.slice(4, 8).map(item => (
//             <li key={gen.next().value}>
//               {item.path ? (
//                 <Link to={cleanPath(item.path)}>{item.title}</Link>
//               ) : (
//                 <p>{item}</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="column is-3">
//         <h3 role="presentation" className="is-hidden-mobile">
//           <br />
//         </h3>
//         <ul>
//           {navigationItems.slice(8, 12).map(item => (
//             <li key={gen.next().value}>
//               {item.path ? (
//                 <Link to={cleanPath(item.path)}>{item.title}</Link>
//               ) : (
//                 <p>{item}</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="column is-3">
//         <h3 role="presentation" className="is-hidden-mobile">
//           <br />
//         </h3>
//         <ul>
//           {navigationItems.slice(12, 16).map(item => (
//             <li key={gen.next().value}>
//               {item.path ? (
//                 <Link to={cleanPath(item.path)}>{item.title}</Link>
//               ) : (
//                 <p>{item}</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );

export default Footer;
