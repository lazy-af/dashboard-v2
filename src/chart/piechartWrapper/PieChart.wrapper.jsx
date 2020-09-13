import React, { useRef, useState, useEffect } from "react";
import D3PieChart from "./D3PieChart";
// import "./PieChart.styles.scss";
import Axios from "axios";
import { json } from 'd3';
import { pieUtility } from "./Utility";
import { connect } from "react-redux";

const PieChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [data, setData] = useState([]);
  // let url = "https://dashboard-8836f.firebaseio.com/data.jsonnnn"; //https://dashboard-8836f.firebaseio.com/data.json


  // useEffect(() => {
  //   Axios.get(url)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .then((data) => {
  //       return pieUtility(data);
  //     })
  //     .then((finalData) => {
  //       setData(finalData)
  //     }).catch(err => {
  //       console.log('error found: ', err);
  //       json('dummydata.json').then(data => {
  //         console.log("red data", props.reducerData)
  //         return pieUtility(data)
  //       }).then((finalData => setData(finalData)))
  //     });
  // }, [props.reducerData, url]);

  useEffect(() => {
    console.log("params:", props.urlParams)
    setData(pieUtility(props.dataReceived)); 
  }, [props.dataReceived, props.urlParams])



  useEffect(() => {
    if (!chart) {
      setChart(
        new D3PieChart(
          chartArea.current,
          props.width,
          props.height,
          props.colorScheme,
          props.legend,
          props.legendLength
        )
      );
    } else {
      chart.update(data);
    }
  }, [
    chart,
    data,
    props.colorScheme,
    props.height,
    props.legend,
    props.legendLength,
    props.width,
  ]);

  return <div ref={chartArea}></div>;
};


const mapStateToProps = (state) => {
  return {
    dataReceived: state.data,
    urlParams: state.url
  }
}

export default connect(mapStateToProps)(PieChartWrapper);