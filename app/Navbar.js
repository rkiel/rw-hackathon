var React       = require('react');
var Bootstrap   = require('react-bootstrap');
var Navbar      = Bootstrap.Navbar;
var CollapsableNav = Bootstrap.CollapsableNav;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var NavItem = Bootstrap.NavItem;

function render() {
  return (
    <Navbar brand='React-Bootstrap' toggleNavKey={0}>
      <CollapsableNav eventKey={0}>
        <Nav navbar>
          <NavItem eventKey={1} href='#'>Link</NavItem>
          <NavItem eventKey={2} href='#'>Link</NavItem>
          <DropdownButton eventKey={3} title='Dropdown'>
            <MenuItem eventKey='1'>Action</MenuItem>
            <MenuItem eventKey='2'>Another action</MenuItem>
            <MenuItem eventKey='3'>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey='4'>Separated link</MenuItem>
          </DropdownButton>
        </Nav>
        <Nav navbar right>
          <NavItem eventKey={1} href='#'>Link Right</NavItem>
          <NavItem eventKey={2} href='#'>Link Right</NavItem>
        </Nav>
      </CollapsableNav>
    </Navbar>
  );
}

var App = React.createClass({
  render: render
});

React.render(
  <App />,
  document.getElementById('app')
)
