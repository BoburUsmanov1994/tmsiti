import React, {Component} from "react";
import Chart from 'react-apexcharts';
import {menuData} from "@/pages/dashboard";
class PopChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {

                chart: {
                    background: '#fff',
                    foreColor: '#8E8E8E',
                    fontFamily: 'Rubik, sans-serif',
                    toolbar: {
                        show: false
                    },
                },
                stroke: {
                    curve: 'straight',
                },
                xaxis: {
                    labels: {
                        show: true
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'dotted',
                        color: '#78909C',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    },

                    categories: [
                        "Yan", "Feb", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"
                    ]
                },
                yaxis: {
                    tickAmount: 4,
                    min: 0,
                    max: 200
                },

                markers: {
                    size: 5
                },
                legend: {
                    position: 'top',
                    fontSize: '14px',
                    markers: {
                        strokeWidth: '2px'
                    }

                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                },
                fill: {
                    colors: ["#F07427"]
                },


            },
            tooltip: {
                enabled: false
            },


            series: [
                {
                    name: menuData[0].title,
                    color: menuData[0].color,
                    data: [
                        300, 157, 289, 45, 12, 169, 200, 35, 78, 400, 156, 98
                    ],

                },
                {
                    name: menuData[1].title,
                    color: menuData[1].color,
                    data: [
                        254, 157, 289, 45, 12, 89, 200, 170, 78, 200, 156, 98
                    ],

                },

                {
                    name: menuData[2].title,
                    color: menuData[2].color,
                    data: [
                        180, 69, 289, 45, 12, 289, 200, 56, 78, 300, 156, 98,
                    ],

                },

                {
                    name: menuData[3].title,
                    color: menuData[3].color,
                    data: [
                        50,39,32,78,43,50,14,83,240,80,145,19
                    ],

                },

                {
                    name: menuData[4].title,
                    color: menuData[4].color,
                    data: [
                        150,107,39,59,100,50,284,18,385,86,80,19
                    ],

                },

                {
                    name: menuData[5].title,
                    color: menuData[5].color,
                    data: [
                        70,139,20,78,313,24,184,33,45,106,180,90
                    ],

                },





            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type={'line'}
                    height={"450"}
                    width={"100%"}
                />

            </React.Fragment>
        )
    }
}

export default PopChart;