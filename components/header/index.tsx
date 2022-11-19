import { Navbar, Dropdown, Avatar } from 'flowbite-react';

export default function Header() {
  return (
    <Navbar fluid={true}>
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          eShopFloor
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar rounded={true} />}
        >
          <Dropdown.Header>
            <span className="block text-sm">Join Doe</span>
            <span className="block truncate text-sm font-medium">
              joindoe@example.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/#">eSOPs</Navbar.Link>
        <Navbar.Link href="/#">eLogs</Navbar.Link>
        <Navbar.Link href="/#">Notifications</Navbar.Link>
        <Navbar.Link href="" active={true}>
          Global Search
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
