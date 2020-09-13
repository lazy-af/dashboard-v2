import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/actionCreators";

const MultiDropCap = (props) => {
  const options = [
    { label: "Anlyts", value: "anlyts" },
    { label: "Adjstmts", value: "adjstmts" },
    { label: "Qlty Vld", value: "qltyvld" },
    { label: "Data Ex", value: "dataex" },
    { label: "Data En", value: "dataen" },
    { label: "Data Tr", value: "datatr" },
    { label: "Data Vi", value: "datavi" },
    { label: "Data Re", value: "datare" },
    { label: "Prcs Autmn", value: "prcsautmn" },
    { label: "Other", value: "other" },
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
    paramsHandler: (params) => dispatch(actionCreators.capApi(params)),
  };
};

export default connect(null, mapDispatchToProps)(MultiDropCap);
