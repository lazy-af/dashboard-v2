import React, { useState } from "react";
import "./KPItile.css";
import Axios from "axios";
import { useEffect } from "react";
import { json } from "d3";
import { KPIUtility } from "./Utility";
import { connect } from "react-redux";

const KPITile = (props) => {
  const [data, setData] = useState({});
  let url = "https://dashboard-8836f.firebaseio.com/data.jsonmnmn";

//   useEffect(() => {
//     Axios.get(url)
//       .then((response) => {
//         console.log(response.data);
//         return response.data;
//       })
//       .then((data) => {
//         return KPIUtility(data, props.phase);
//       })
//       .then((d) => {
//         setData(d);
//       })
//       .catch((err) => {
//         console.log("error found:", err);
//         json("dummydata.json")
//           .then((data) => {
//             return KPIUtility(data, props.phase);
//           })
//           .then((d) => {
//             setData(d);
//           });
//       });
//   }, [url, props.phase]);

useEffect(() => {
    console.log("KPIparams:", props.urlParams)
    setData(KPIUtility(props.dataReceived, props.phase)); 
  }, [props.dataReceived, props.phase, props.urlParams])



  return (
    <div className="tile-container">
      <p>{data.phase}</p>
      <img className="icon" src={props.img} alt="icon" />

      <hr />
      <h4>{data.count}</h4>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        dataReceived: state.data,
        urlParams: state.url
      }
}

export default connect(mapStateToProps)(KPITile);
