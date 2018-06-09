import React, { PureComponent } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Taken from
// https://github.com/akameco/styled-spinkit/tree/master/src/ThreeBounce

const size = (width, height = width) => css`
  width: ${width};
  height: ${height};
`;

const sizePx = n => size(`${n}px`);
const propMargin = ({ size = 0 }) =>
  css`
    margin: ${size}px auto;
  `;
const propBgColor = ({ color }) =>
  css`
    background-color: ${color};
  `;

const bounce = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const Child = styled.div`
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.4s ease-in-out ${p => p.delay}s infinite both;
`;

const StyledThreeBounce = styled.div`
  width: ${p => p.size}px;
  ${propMargin};
  text-align: center;
  border-radius: 100%;
  display: inline-block;
  margin: 0;
  > ${Child} {
    ${p => sizePx(p.size / 4)};
    ${propBgColor};
  }
`;

class ThreeBounce extends PureComponent {
  render() {
    return (
      <StyledThreeBounce {...this.props}>
        <Child delay={-0.32} />
        <Child delay={-0.16} />
        <Child delay={0} />
      </StyledThreeBounce>
    );
  }
}

ThreeBounce.defaultProps = {
  color: '#fff',
  size: 40
};

export default ThreeBounce;
