import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/actionCreators";

const MultiDropButton = (props) => {
  const options = [
    { label: "Development", value: "development" },
    { label: "Ideation", value: "ideation" },
    { label: "Production", value: "production" },
    { label: "Retired", value: "retired" },
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
    paramsHandler: (params) => dispatch(actionCreators.phaseApi(params)),
  };
};

export default connect(null, mapDispatchToProps)(MultiDropButton);
