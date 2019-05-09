import React, { Component } from 'react';
import Chart from '../../../../node_modules/chart.js/src/chart';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.ctx = 'lineChart';
  }

  componentDidUpdate() {
    const { series } = this.props;
    console.log(series);
    if(series) {
      const COLORS = [
      	'#4dc9f6',
      	'#f67019',
      	'#f53794',
      	'#537bc4',
      	'#acc236',
      	'#166a8f',
      	'#00a950',
      	'#58595b',
      	'#8549ba'
      ];

      const labels = [];

      const datasets = [];

      for (let serie in series) {
        if (series.hasOwnProperty(serie)) {
          	const newColor = COLORS[datasets.length % COLORS.length];

            const dataset = {
              label: serie,
              borderColor: newColor,
          	  backgroundColor: newColor,
              data: series[serie].map(d => {
                return {
                  x: d.Name,
                  y: d.Value
                }
              }),
              fill: false,
            };

            datasets.push(dataset);
        }
      }

      for (let index = 0; index < series['totalEarnings'].length; index++) {
        labels.push(series['totalEarnings'][index].Name);
      }

      this.lineChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {
    			responsive: true,
    			title: {
    				display: true,
    				text: 'Series Line Chart'
    			},
          tooltips: {
            mode: 'x'
          },
    			scales: {
    				xAxes: [{
    					display: true,
    					scaleLabel: {
    						display: true,
    						labelString: 'Months'
    					}
    				}],
    				yAxes: [{
    					display: true,
    					scaleLabel: {
    						display: true,
    						labelString: 'Money'
    					}
    				}]
    			}
			  }
      });
    } else if(this.lineChart) {
      this.lineChart.destroy();
    }
  }

  render() {
    return (
      <canvas id={this.ctx} ></canvas>
    );
  }
}

export default LineChart;
