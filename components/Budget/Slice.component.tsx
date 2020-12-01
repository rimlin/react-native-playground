import React from 'react';
import { Path } from 'react-native-svg';
import * as d3 from 'd3';

interface Props {
  data: any[];
  index: number;
  endAngle: number;
  color: string;
}

export class Slice extends React.Component<Props> {
  render() {
    const { data, index, endAngle, color } = this.props;

    const sectionAngles = d3
      .pie<any, any>()
      .value(d => d.value)
      .startAngle(0)
      .endAngle(endAngle)(data);

    const section = sectionAngles[index];

    const path = d3.arc().outerRadius(100).padAngle(0).innerRadius(50);

    return <Path d={path(section as any)} fill={color} />;
  }
}
