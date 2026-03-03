import {
  UserOutlined,
  HomeOutlined,
  CameraOutlined,
  CalendarOutlined,
  SolutionOutlined,
  CreditCardOutlined,
  ToolOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const { Sider, Header, Content } = Layout;

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    children,
    label: path ? <Link to={path}>{label}</Link> : label,
  };
}


function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  const items = [
    getItem('Dashboard', 'dashboard', <HomeOutlined />, null, [
      getItem('Overview', 'dashboard-overview', null, '/overview'),
      getItem('Statistics', 'dashboard-stats', null, '/stats'),
      getItem('Recent Activity', 'dashboard-activity', null, '/activity'),
    ]),

    getItem('Users', 'users', <UserOutlined />, null, [
      getItem('Profile', 'users-profile', null, '/user/profile'),
      getItem('All Users', 'users-all', null, '/user/'),
      getItem('Add User', 'add-user', null, '/user/adduser'),
      getItem('Clients', 'users-clients', null, '/user/clients'),
      getItem('User Reports', 'users-reports', null, '/user/reports'),
    ]),

    getItem('Photographers', 'photographers', <CameraOutlined />, null, [
      getItem('All Photographers', 'photographers-all', null, '/photographers/all'),
      getItem('Add Photographer', 'add-photographer', null, '/photographers/addphotographer'),
      getItem('Reviews & Ratings', 'photographers-reviews', null, '/photographers/reviews'),
    ]),


    getItem('Events', 'events', <CalendarOutlined />, null, [
      getItem('All Events', 'events-all', null, '/events/all'),
      getItem('Upcoming Events', 'events-upcoming', null, '/events/upcoming'),
      getItem('Past Events', 'events-past', null, '/events/past'),
    ]),

    getItem('Bookings & Reservations', 'bookings', <SolutionOutlined />, null, [
      getItem('All Bookings', 'bookings-all', null, '/bookings/all'),
      getItem('Pending', 'bookings-pending', null, '/bookings/pending'),
    ]),

    getItem('Payments', 'payments', <CreditCardOutlined />, null, [
      getItem('Transactions', 'payments-transactions', null, '/payments/transactions'),
      getItem('Pending Payments', 'payments-pending', null, '/payments/pending'),
      getItem('Refunds', 'payments-refunds', null, '/payments/refunds'),
    ]),

    getItem('Settings', 'settings', <ToolOutlined />, null, [
      getItem('General Settings', 'settings-general', null, '/settings/general'),
      getItem('Security', 'settings-security', null, '/settings/security'),
    ]),
  ];
  const dropdownItems = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <Link to="/user/profile">Profile</Link>
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout'
      }
    ]
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 24px", backgroundColor: "#ffffff", display:"flex",alignItems:"center",justifyContent:"flex-end"}} >
          <Dropdown menu={dropdownItems} trigger={['click']}placement='bottomRight'>
            <Avatar
              src={user?.avatar ? `http://localhost:3000/uploads/${user.avatar}` : undefined}
              icon={!user?.avatar && <UserOutlined />}
              size={38}

            />

          </Dropdown>


        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: 14,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;