import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from './Media';
import Markup from './Markup';

const features = [
    {
        title: 'Bird’s AI',
        image: '/video.png',
        description: 'Accessible, low cost, & highly automated  land cover mapping & monitoring across the globe.'
    },
    {
        title: 'Map',
        image: '/map.png',
        description: 'We firmly believe that life doesn\'t need to be complicated. Visit our data portal for easy access to near real time & ready-to-use satellite data.'
    },
    {
        title: 'For whom',
        image: '/forwhom.png',
        description: 'We are here for any information driven entity with the need for more frequent, affordable and actionable information for decision making, (market) research, monitoring, management, and advocacy related to land use & land cover (changes) all over the world.'
    }
];

export default function Features({features, alternate}) {
    const leftClassname = 'col-md-5 offset-md-1';
    const rightClassname = idx =>
        alternate && idx % 2 ? 'col-md-5 offset-md-1' : 'col-md-4 offset-md-1';
    return (
        <div>
            {features.map((feature, idx) => (
                <FlexRow key={idx} className={alternate && idx % 2 && 'alternate'}>
                    <div className={leftClassname}>
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

function FeatureContent({title, description}) {
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

function FeatureImage({image, title}) {
    return (
        <div className="position-relative">
            <ImageContainer>
                <img src={image} className="img-fluid py-4" alt={title}/>
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
  ${media.tablet`
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
  ${media.tablet`
    width: auto;
  `};
`;
