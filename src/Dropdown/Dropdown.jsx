import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import DropdownItem from './DropdownItem';
import './Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    const { title } = this.props;
    this.state = {
      isOpen: false,
      title,
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { isOpen } = this.state;
    setTimeout(() => {
      if (isOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  getTitle = () => {
    const { selectedSectors, clearSelection } = this.props;
    const { title } = this.state;
    if (selectedSectors.size) {
      const selectedSectorsArray = Array.from(selectedSectors.values());
      let result = `${title}: ${selectedSectorsArray[0].name}`;
      if (selectedSectorsArray.length === 2) {
        result += ` + ${selectedSectorsArray.length - 1} other`;
      } else if (selectedSectorsArray.length > 2) {
        result += ` + ${selectedSectorsArray.length - 1} others`;
      }
      return (
        <React.Fragment>
          <span>{result}</span>
          <CancelOutlined classes={{ root: 'Dropdown-clear' }} onClick={clearSelection} />
        </React.Fragment>
      );
    }
    return title;
  }

  close() {
    this.setState({
      isOpen: false,
    });
  }

  toggleList() {
    const { list } = this.props;
    if (Object.keys(list).length) {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
      }));
    }
  }

  handleDelete(sector) {
    const { removeItem } = this.props;
    removeItem(sector);
  }

  render() {
    const {
      list,
      selectItem,
      removeItem,
      selectedSectors,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={isOpen ? 'Dropdown open' : 'Dropdown'}>
        <div className="Dropdown-header" onClick={() => this.toggleList()}>
          <div className="Dropdown-header-title">{this.getTitle()}</div>
        </div>
        {isOpen && (
        <div className="Dropdown-list-container">
          <div className="Dropdown-selectedSectors">
            {Array.from(selectedSectors.values()).map(sector => (
              <Chip
                key={sector.id}
                label={sector.name}
                onClick={e => e.stopPropagation()}
                onDelete={() => this.handleDelete(sector)}
                deleteIcon={<CancelOutlined />}
                classes={{ root: 'Dropdown-selectedChip', deleteIcon: 'Dropdown-deleteIcon' }}
              />
            ))}
          </div>
          <ul className="Dropdown-list" onClick={e => e.stopPropagation()}>
            {
              Object.values(list)
                .map(item => (
                  <DropdownItem
                    key={item.id}
                    item={item}
                    selectItem={selectItem}
                    removeItem={removeItem}
                    selectedSectors={selectedSectors}
                  />))}
          </ul>
        </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
