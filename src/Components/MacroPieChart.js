import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import PropTypes from 'prop-types';

class MacroPieChart extends React.PureComponent {

  render()  {
  
    let data;
    if(this.props.carbs != 0 || this.props.protein != 0 || this.props.fat != 0) {
      data = [
        {
          key: 1,
          value: this.props.protein,
          svg: { fill: '#41DC25'}
        },
        {
          key: 2,
          value: this.props.fat,
          svg: { fill: '#DC2B25'}
        },
        {
          key: 3,
          value: this.props.carbs,
          svg: { fill: '#2565DC'}
        }
      ]
    } else {
      data = [
        {
          key: 1,
          value: 1,
          svg: { fill: '#9B9B9B'}
        }
      ]
    }
    
    return (
      <PieChart
        style={this.props.style}
        data={data}
        sort={(a,b) => a.key - b.key} //Clockwise lowest to highest key
      />
    )
  }
}

MacroPieChart.propTypes = {
  protein: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbs: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired // Needs width and height or similar parameters
}

export default MacroPieChart;
