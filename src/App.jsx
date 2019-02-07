import React, { Component } from 'react';
import Dropdown from './Dropdown/Dropdown';
import './App.css';
import createNestedSectors from './Data/Convertor';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectoringScheme: null,
      selectedSectors: new Map(),
    };
  }

  componentDidMount() {
    fetch('/data/data.json')
      .then(response => response.json())
      .then((data) => {
        this.setState({ sectoringScheme: createNestedSectors(data) });
      });
  }

  addSelected = (sector) => {
    const { selectedSectors } = this.state;
    const newSlectedSectors = new Map(selectedSectors);
    newSlectedSectors.set(sector.id, sector);
    this.setState({ selectedSectors: newSlectedSectors });
  }

  removeSelected = (sector) => {
    const { selectedSectors } = this.state;
    if (selectedSectors.has(sector.id)) {
      const newSlectedSectors = new Map(selectedSectors);
      newSlectedSectors.delete(sector.id);
      this.setState({ selectedSectors: newSlectedSectors });
    }
  }

  clearSelection = () => {
    this.setState({ selectedSectors: new Map() });
  }

  render() {
    const { sectoringScheme, selectedSectors } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <Dropdown
            title="Include: "
            list={[]}
            selectedSectors={[]}
            selectItem={() => {}}
            removeItem={() => {}}
          />
          <Dropdown
            title="RGS"
            list={sectoringScheme}
            selectedSectors={selectedSectors}
            selectItem={this.addSelected}
            removeItem={this.removeSelected}
            clearSelection={this.clearSelection}
          />
        </div>
      </div>
    );
  }
}

export default App;
