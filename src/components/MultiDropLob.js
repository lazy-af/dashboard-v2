import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/actionCreators";

const MultiDropLob = (props) => {
  const options = [
    { label: "AWM", value: "awm" },
    { label: "CCB", value: "ccb" },
    { label: "CIB", value: "cib" },
    { label: "CT", value: "ct" },
  ];
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log(selected.map((d) => d.value));
    props.paramsHandler(selected.map((d) => d.value));
  }, [props, selected]);

  return (
    <div style={{ width: 200, display: "inline-block", marginRight: 40 }}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    paramsHandler: (params) => dispatch(actionCreators.lobApi(params)),
  };
};

export default connect(null, mapDispatchToProps)(MultiDropLob);
