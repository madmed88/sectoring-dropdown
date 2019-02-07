import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import './DropdownItem.css';

function getClassName(item, isOpen, selectedSectors) {
  let className = 'Dropdown-list-item';
  if (item.parent) {
    if (item.children) {
      className += ' level2';
    } else {
      className += ' level3';
    }
  }
  if (isOpen) {
    className += ' open';
  }
  if (selectedSectors.has(item.id)) {
    className += ' selected';
  }
  return className;
}

class DropdownItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  onSelectionChanged = (event) => {
    const { item, selectItem, removeItem } = this.props;
    if (event.target.checked) {
      selectItem(item);
    } else {
      removeItem(item);
    }
  }

  getIcon = (item, isOpen) => {
    if (item.children) {
      return isOpen
        ? <Icon onClick={() => this.setState({ isOpen: false })} classes={{ root: 'Dropdown-list-item-icon'}}>keyboard_arrow_down</Icon>
        : <Icon onClick={() => this.setState({ isOpen: true })} classes={{ root: 'Dropdown-list-item-icon'}}>keyboard_arrow_right</Icon>;
    }
    return <Icon classes={{ root: 'Dropdown-list-item-icon'}} />;
  }

  render() {
    const {
      item,
      selectItem,
      removeItem,
      selectedSectors,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <li className={getClassName(item, isOpen, selectedSectors)} key={item.id}>
        <div className="Dropdown-list-item-container">
          {this.getIcon(item, isOpen)}
          <Checkbox
            className="Dropdown-list-item-checkbox"
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
            color="default"
            onChange={this.onSelectionChanged}
            checked={selectedSectors.has(item.id)}
          />
          <div className="Dropdown-list-item-name-container">
            <span className="Dropdown-list-item-name">{item.name}</span>
            <div className="Dropdown-list-item-name-children">
              {item.children && Object.values(item.children).map(child => selectedSectors.has(child.id) && <span key={child.id} className="Dropdown-list-item-name-child">{child.name}</span>)}
            </div>
          </div>
        </div>
        <ul className="Dropdown-list-deep" onClick={e => e.stopPropagation()}>
          {isOpen && Object.values(item.children)
            .map(child => (
              <DropdownItem
                key={child.id}
                item={child}
                selectItem={selectItem}
                removeItem={removeItem}
                selectedSectors={selectedSectors}
              />))}
        </ul>
      </li>
    );
  }
}

export default DropdownItem;
