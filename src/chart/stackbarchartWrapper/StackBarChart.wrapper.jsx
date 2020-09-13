import React, { useRef, useState, useEffect } from "react";
import D3StackBarChart from "./D3StackBarChart";
import Axios from "axios";
import { stackBarUtility2, stackBarUtility1 } from "./Utility";
import { json } from "d3";
import { connect } from "react-redux";

const StackBarChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [data, setData] = useState([]);
  // let url = 'https://dashboard-8836f.firebaseio.com/data.json';

  // useEffect(() => {
  //     Axios.get(url).then(response => {
  //         return response.data;
  //     }).then(data => {
  //         const allCapablities = data.map(d => d.capabilities);
  //         const capability = allCapablities.filter((d, i) => allCapablities.indexOf(d) === i);
  //         stackBarUtility1(data);
  //         console.log("stackutil1:", stackBarUtility1(data));
  //         return stackBarUtility2(capability);
  //     }).then(finalData => {
  //         setData(finalData);
  //     }).catch(err => {
  //         console.log("error Found:", err);
  //         json("dummydata.json").then(data => {
  //             const allCapablities = data.map(d => d.capabilities);
  //             const capability = allCapablities.filter((d, i) => allCapablities.indexOf(d) === i);
  //             stackBarUtility1(data);
  //             return stackBarUtility2(capability);
  //         }).then(finalData => {
  //             console.log(finalData);
  //             setData(finalData);
  //         })
  //     })
  // }, [url])

  useEffect(() => {
    const allCapablities = props.dataReceived.map((d) => d.capabilities);
    const capability = allCapablities.filter(
      (d, i) => allCapablities.indexOf(d) === i
    );
    stackBarUtility1(props.dataReceived);
    const finalData = stackBarUtility2(capability);
    setData(finalData);
  }, [props.dataReceived]);

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3StackBarChart(
          chartArea.current,
          props.width,
          props.height,
          props.legend,
          props.legendWidth,
          props.colorScheme,
          props.xAxisLabel
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
    props.legendWidth,
    props.width,
    props.xAxisLabel,
  ]);

  return <div ref={chartArea}></div>;
};

const mapStateToProps = (state) => {
  return {
    dataReceived: state.data,
  };
};

export default connect(mapStateToProps)(StackBarChartWrapper);
