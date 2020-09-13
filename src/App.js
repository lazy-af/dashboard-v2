import React from "react";
import "./App.css";
import PieChart from "./chart/piechartWrapper";
import StackBarChart from "./chart/stackbarchartWrapper";
import MultiDropPhase from "./components/MultiDropPhase";
import MultiDropLob from "./components/MultiDropLob";
import MultiDropCap from "./components/MultiDropCap";
import SunBurstChart from "./chart/sunburstchartWrapper";
import MultiDropStu from "./components/MultiDropStu";
import KPITile from "./KPITile/KPITile";

function App(props) {
  // const url = "https://dashboard-8836f.firebaseio.com/data.json";

  // const initialCallHandler = () => {
  //   props.dataUpdate(url);
  // }
  return (
    <div className="body">
      <div className="btn-pos">
        <div style={{ marginTop: 30, marginLeft: 20 }}>
          <MultiDropPhase />
          <MultiDropLob />
          <MultiDropCap />
          <MultiDropStu />
        </div>

        <KPITile
          phase="development"
          img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png"
        />
        <KPITile
          phase="ideation"
          img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png"
        />
        <KPITile
          phase="production"
          img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png"
        />
        <KPITile
          phase="retired"
          img="https://images.vexels.com/media/users/3/129234/isolated/preview/73970c892d748c7507db8e10d71535b0-apple-logo-icon-by-vexels.png"
        />
      </div>
      <div className="pie-pos">
        <PieChart />
      </div>
      <div className="stackbar-pos">
        <StackBarChart />
      </div>
      <div className="sunburst-pos">
        <SunBurstChart />
      </div>
    </div>
  );
}

export default App;
