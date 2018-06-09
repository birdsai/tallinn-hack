import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from './Media';
import Markup from './Markup';

const features = [
  {
    title: 'Cool feature 1',
    image: 'http://via.placeholder.com/450x350',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis earum quo iste doloremque maiores! Deserunt impedit ipsam facilis quidem distinctio eaque eveniet eum accusantium aut! Iusto, consequuntur. Asperiores, dolorem.'
  },
  {
    title: 'Cool feature 2',
    image: 'http://via.placeholder.com/450x350',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis earum quo iste doloremque maiores! Deserunt impedit ipsam facilis quidem distinctio eaque eveniet eum accusantium aut! Iusto, consequuntur. Asperiores, dolorem.'
  },
  {
    title: 'Cool feature 3',
    image: 'http://via.placeholder.com/450x350',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis earum quo iste doloremque maiores! Deserunt impedit ipsam facilis quidem distinctio eaque eveniet eum accusantium aut! Iusto, consequuntur. Asperiores, dolorem.'
  }
]

export default function Features({ features, alternate }) {
  const leftClassname = idx =>
    alternate && idx % 2 ? 'col-md-5 offset-md-1' : 'col-md-5';
  const rightClassname = idx =>
    alternate && idx % 2 ? 'col-md-5 offset-md-1' : 'col-md-6 offset-md-1';
  return (
    <div>
      {features.map((feature, idx) => (
        <FlexRow key={idx} className={alternate && idx % 2 && 'alternate'}>
          <div className={leftClassname(idx)}>
            <FeatureContent {...feature} />
          </div>
          <div className={rightClassname(idx)}>
            <FeatureImage {...feature} />
          </div>
        </FlexRow>
      ))}
    </div>
  );
}

Features.propTypes = {
  features: PropTypes.array,
  alternate: PropTypes.bool
};

Features.defaultProps = {
  features: features,
  alternate: false
};

function FeatureContent({ title, description }) {
  return [
    <h2 key={1}>{title}</h2>,
    <Lead key={2}>
      <Markup>{description}</Markup>
    </Lead>
  ];
}

FeatureContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

function FeatureImage({ image, title }) {
  return (
    <div className="position-relative">
      <ImageContainer>
        <img src={image} className="img-fluid py-4" alt={title} />
      </ImageContainer>
    </div>
  );
}

FeatureImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string
};

const FlexRow = styled.div.attrs({
  className: 'row align-items-center py-4'
})`
  ${media.down.tablet`
    flex-direction: column;
  `};

  &.alternate {
    flex-direction: row-reverse !important;
    img,
    .img-container {
      float: right !important;
    }
  }
`;

const Lead = styled.div`
  font-size: 19px;
  color: #777;
`;

const ImageContainer = styled.div.attrs({
  className: 'img-container'
})`
  width: 1200px;
  ${media.down.tablet`
    width: auto;
  `};
`;
