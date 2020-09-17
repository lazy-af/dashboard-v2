import React, { useRef, useState, useEffect } from "react";
import D3SunBurstChart from "./D3SunBurstChart";
import Axios from "axios";
import { json } from "d3";
import { SunBurstUtility } from "./Utility";
import { connect } from "react-redux";

// Function that takes csv data as an input an convert it into a json data
const buildHierarchy = (csv) => {
  var root = { name: "root", children: [] };
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        var foundChild = false;
        for (var k = 0; k < children.length; k++) {
          if (children[k]["name"] === nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = { name: nodeName, children: [] };
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = { name: nodeName, size: size };
        children.push(childNode);
      }
    }
  }
  return root;
};

const SunBurstChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  let url = "https://dashboard-8836f.firebaseio.com/data.jsonbb";

  const [data, setData] = useState([]);

  const clickHandler = () => {};

  useEffect(() => {
    Axios.get(url)
      .then((data) => {
        return SunBurstUtility(data.data);
      })
      .then((finalData) => {
        return finalData.map((d) => {
          return [d.path, d.ratio];
        });
      })
      .then((data) => {
        var json = buildHierarchy(data);
        setData(json);
      })
      .catch((err) => {
        console.log("error found:", err);
        json("dummydata.json")
          .then((data) => {
            console.log("Original Data", data);
            console.log("Data Received", props.dataReceived);
            console.log(SunBurstUtility([]));
            return SunBurstUtility(data);
          })
          .then((finalData) => {
            console.log("FINALDATA:", finalData);
            return finalData.map((d) => {
              return [d.path, d.ratio];
            });
          })
          .then((data) => {
            console.log("DDTT", data);
            let json = buildHierarchy(data);
            console.log("BUILFH", json);
            setData(json);
          });
      });
  }, [url]);

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3SunBurstChart(chartArea.current, props.width, props.height)
      );
    } else {
      chart.update(data);
    }
  }, [chart, data, props.height, props.width]);

  return (
    <div id="main">
      <div id="sequence"></div>
      <div ref={chartArea} id="chart">
        <div id="explanation" style={{ visibility: "hidden" }}>
          <span id="percentage"></span>
          <br />
          of visits begin with this sequence of pages
        </div>
      </div>
      <button onClick={clickHandler}>click</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataReceived: state.data,
    urlParams: state.url,
  };
};

export default connect(mapStateToProps)(SunBurstChartWrapper);
