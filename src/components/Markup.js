import React from 'react';
import PropTypes from 'prop-types';

// It's nicer to avoid writing `dangerouslySetInnerHTML` all the time
// when you want to display markup content.
// <Markup>{content}</Markup> is much nicer

export default function Markup({ children, ...rest }) {
  return <div dangerouslySetInnerHTML={{ __html: children }} {...rest} />;
}

Markup.propTypes = {
  children: PropTypes.string.isRequired
};
