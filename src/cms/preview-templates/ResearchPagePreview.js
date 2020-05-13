import React from 'react';
import PropTypes from 'prop-types';
import { ResearchPageTemplate } from '../../templates/research-page';

const ResearchPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  console.log(data);

  if (data) {
    return (
      <ResearchPageTemplate
        content={data.body}
        heading={data.heading}
        description={data.description}
        featuredimages={data.featuredimages}
        centeredSection={data.centeredSection}
        careers={data.careers}
        splitSection={data.splitSection}
        backgroundSection={data.backgroundSection}
      />
    );
  }
  return <div>Loading...</div>;
};

ResearchPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default ResearchPagePreview;
