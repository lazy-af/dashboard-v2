import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/actionCreators";

const MultiDropStu = (props) => {
  const options = [
    { label: "Tableau", value: "tableau" },
    { label: "WinAutomation", value: "winautomation" },
    { label: "QlikView", value: "qlikView" },
    { label: "AutomationAnywhere", value: "automationanywhere" },
    { label: "Alteryx", value: "alteryx" },
    { label: "Cognos", value: "cognos" },
    { label: "ReportBuilder", value: "reportbuilder" },
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
    paramsHandler: (params) => dispatch(actionCreators.stuApi(params)),
  };
};

export default connect(null, mapDispatchToProps)(MultiDropStu);
