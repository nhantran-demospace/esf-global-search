import { Navbar, Dropdown, Avatar } from 'flowbite-react';

export default function Header() {
  return (
    <Navbar fluid={true} className="bg-teal-600 text-white">
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
        <Navbar.Link href="/#" className="text-white">
          eSOPs
        </Navbar.Link>
        <Navbar.Link href="/#" className="text-white">
          eLogs
        </Navbar.Link>
        <Navbar.Link href="/#" className="text-white">
          Notifications
        </Navbar.Link>
        <Navbar.Link href="" active={true} className="text-white">
          Global Search
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
