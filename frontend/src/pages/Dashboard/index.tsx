import React from "react";
// import { Button } from "antd";
// import { connect } from "react-redux";
import logo from "../../logo.svg";
import "../../App.css";

// const App: FC = () => (
//   <div className="App">
//     <Button type="primary">Button</Button>
//   </div>
// );
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// const mapStateToProps = (state: { value: number }) => ({
//   value: state.value,
// });

// const mapDispatchToProps = {
//   increment: () => incrementValue(),
// };
export default App;
