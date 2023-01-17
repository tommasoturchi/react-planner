import * as SharedStyle from "../../shared-style";

import {
  Button,
  FormLabel,
  FormNumberInput,
  FormSelect,
} from "../style/export";
import React, { Component } from "react";

import Panel from "./panel";
import PropTypes from "prop-types";

const SERVERADDR = "http://127.0.0.1:3002";

const contentArea = {
  height: "auto",
  maxHeight: "20em",
  overflowY: "auto",
  padding: "0.25em 1.15em",
  cursor: "pointer",
  marginBottom: "1em",
  userSelect: "none",
};

const tableSearchStyle = { width: "100%", marginTop: "0.8em" };

export default class PanelImprove extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      scenario: 0,
      residents: 0,
      score: null,
    };

    this.changeScenario = this.changeScenario.bind(this);
    this.setResidents = this.setResidents.bind(this);

    this.evaluate = this.evaluate.bind(this);
    this.improve = this.improve.bind(this);
  }

  changeScenario(event) {
    this.setState({ scenario: event.target.value });
  }

  setResidents(event) {
    this.setState({ residents: event.target.value });
  }

  async evaluate() {
    let { state: globalState } = this.props;

    fetch(`${SERVERADDR}/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...globalState.scene.toJS(),
        improve: {
          residents: this.state.residents,
          scenario: this.state.scenario,
        },
      }),
    })
      .then((response) => response.json())
      .then(({ message, score }) => {
        if (message === "success") this.setState({ score });
      });
  }

  async improve() {
    let { state: globalState } = this.props;

    fetch(`${SERVERADDR}/improve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...globalState.scene.toJS(),
        improve: {
          residents: this.state.residents,
          scenario: this.state.scenario,
        },
      }),
    })
      .then((response) => response.json())
      .then(({ message, content, score }) => {
        if (message === "success")
          this.context.projectActions.loadProject(content);
          this.setState({ score });
      });

    console.log({
      ...globalState.scene.toJS(),
      improve: {
        residents: this.state.residents,
        scenario: this.state.scenario,
      },
    });
  }

  render() {
    return (
      <Panel name="IMPROVE" opened={true}>
        <div style={contentArea} onWheel={(e) => e.stopPropagation()}>
          <table style={tableSearchStyle}>
            <tbody>
              <tr>
                <td>
                  <FormLabel>Scenario</FormLabel>
                </td>
                <td>
                  <FormSelect
                    value={this.state.scenario}
                    onChange={this.changeScenario}
                  >
                    <option value="0">Improvement of Spatial Quality</option>
                    <option value="1">Reduction of Energy Bills</option>
                  </FormSelect>
                </td>
              </tr>
              <tr>
                <td>
                  <FormLabel>Number of Residents</FormLabel>
                </td>
                <td>
                  <FormNumberInput
                    value={this.state.residents}
                    onChange={this.setResidents}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button onClick={() => this.evaluate()}>EVALUATE</Button>
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "middle" }}>
                  <FormLabel>Score</FormLabel>
                </td>
                <td style={{ textAlign: "right" }}>
                  <h1
                    style={{
                      margin: 0,
                      marginBottom: "5px",
                      cursor: "default",
                    }}
                  >
                    {this.state.score == null
                      ? "--"
                      : parseFloat(this.state.score).toFixed(3)}
                  </h1>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button onClick={() => this.improve()}>IMPROVE</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    );
  }
}

PanelImprove.propTypes = {
  state: PropTypes.object.isRequired,
};

PanelImprove.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
