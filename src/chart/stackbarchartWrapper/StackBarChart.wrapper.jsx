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

  useEffect(() => {
    const allCapablities = props.dataReceived.map((d) => d.capabilities);
    const capability = allCapablities.filter(
      (d, i) => allCapablities.indexOf(d) === i
    );
    console.log("STKUTIL1", stackBarUtility1(props.dataReceived));
    stackBarUtility1(props.dataReceived);
    const finalData = stackBarUtility2(capability);
    console.log("FINAL", finalData);
    setData(finalData);
    return () => {
      document.querySelectorAll(".clss").forEach((e) => e.remove());
    };
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
      console.log("DTTT:", data);
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
