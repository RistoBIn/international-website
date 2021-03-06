import React from 'react';
// import classNames from 'classnames';
// import styles from './Grid.module.scss';
import styled from 'styled-components';
import { CarouselItem } from '../../ImageBoxesWithNavigation';
import { idMaker } from '../../../utils/id-maker';

const gen = idMaker();
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, [col] 330px);
  grid-gap: 20px;
  .item {
    height: 280px !important;
    width: 330px !important;
    min-height: 280px !important;
    min-width: 330px !important;
  }
`;

const Grid = props => {
  const { items } = props;

  if (
    !items ||
    items.length < 1 ||
    !items[0].node ||
    !items[0].node.frontmatter ||
    !items[0].node.fields
  )
    return <></>;
  const itemsFormatted = items.map(item => {
    const { heading: itemHeading, featuredimage } = item.node.frontmatter;

    return {
      featuredimage,
      heading: itemHeading,
      path: item.node.fields.slug,
    };
  });
  return (
    <Wrapper>
      {itemsFormatted.map(item => {
        return (
          <CarouselItem
            key={gen.next().value}
            heading={item.heading}
            featuredimage={item.featuredimage}
            path={item.path}
            className="item"
          />
        );
      })}
    </Wrapper>
  );
};

export default Grid;
