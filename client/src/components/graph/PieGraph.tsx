import React, { useMemo } from 'react';
import CircleSVG from './Circle';
import styled from 'styled-components';

const SVG = styled.svg`
  transform: rotate(-90deg);
`;

const SVGWrapper = styled.div`
  :after {
    content: '';
    display: block;
    width: 50%;
    margin: 0 auto;
    height: 2px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    box-shadow: 0 0 3px 4px rgba(0, 0, 0, 0.1);
  }
`;

interface PieDrawInfo {
  title: string;
  color: string;
  ratio: number;
}

export interface PieGraphProps {
  transactionData: PieDrawInfo[];
}

const PieGraphSVG = ({ transactionData }: PieGraphProps): React.ReactNode => {
  const svgViewBox = 100;

  const PieGraphs = useMemo(() => {
    let accumulate = 0;
    return transactionData.map((transactionData) => {
      accumulate += transactionData.ratio;
      return (
        <CircleSVG
          key={transactionData.title}
          color={transactionData.color}
          myPercent={transactionData.ratio}
          beforePercent={accumulate - transactionData.ratio}
          viewBox={svgViewBox}
        />
      );
    });
  }, [transactionData]);

  return (
    <SVGWrapper>
      <SVG viewBox={`0 0 ${svgViewBox} ${svgViewBox}`}>{PieGraphs}</SVG>
    </SVGWrapper>
  );
};

export default PieGraphSVG;
