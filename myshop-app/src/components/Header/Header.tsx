import { Layout, Menu, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

function PageHeader() {
  const location = useLocation();
  return (
    <Layout>
      <Header>
        <Menu theme='dark' mode='horizontal' selectedKeys={[location.pathname]} key={location.pathname}>
          <Menu.Item key="/" >
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/products">
            <Link to="/products">Products</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default PageHeader;
