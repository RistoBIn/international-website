import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import Content, { HTMLContent } from '../Content';
import CollapsibleList from '../CollapsibleList';
import { idMaker } from '../../utils/id-maker';
import generateHTML from '../../utils/generateHTML';
import styles from './ResponsibilityTabSection.module.scss';
import TabArrow from '../../img/tabarrow.inline.svg';

const TabItem = styled.div`
  display: flex;
  align-items: center;
  opacity: ${props => props.opacity};

  margin-bottom: 32px;
  &:hover {
    cursor: pointer;
  }
  & svg {
    display: ${props => props.display};
    margin-left: 30px;
  }
`;

class ResponsibilityTabSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: '',
    };
    this.handleTab = this.handleTab.bind(this);
  }

  componentDidMount() {
    const { responsibilities } = this.props;
    this.setState({
      currentTab: responsibilities[0].heading,
    });
  }

  handleTab(tab) {
    this.setState({
      currentTab: tab,
    });
  }

  render() {
    const PostContent = HTMLContent || Content;
    const { responsibilities, className } = this.props;
    const { currentTab } = this.state;
    const gen = idMaker();

    if (!responsibilities || responsibilities.length < 1) return <></>;

    return (
      <section className={classNames(className, styles.tabSection)}>
        <div className="container">
          <div className={classNames(styles.wrapper, 'is-mobile-hidden')}>
            <div>
              {responsibilities.map(item => (
                <TabItem
                  key={gen.next().value}
                  opacity={item.heading === currentTab ? '1' : '0.5'}
                  display={item.heading === currentTab ? 'block' : 'none'}
                  onClick={() => this.handleTab(item.heading)}
                >
                  <h4>{item.heading}</h4>
                  <TabArrow />
                </TabItem>
              ))}
            </div>
            <div>
              {responsibilities.map(item => {
                if (item.heading === currentTab) {
                  return (
                    <PostContent
                      className="content"
                      content={generateHTML(item.content)}
                    />
                  );
                }
                return <></>;
              })}
            </div>
          </div>
          <div className={classNames('is-mobile-show')}>
            <CollapsibleList
              collapsibleItems={responsibilities}
              className="has-light-dark-background"
            />
          </div>
        </div>
      </section>
    );
  }
}

export default ResponsibilityTabSection;
