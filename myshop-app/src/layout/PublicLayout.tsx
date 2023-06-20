import { Layout, Space } from 'antd';
import PageHeader from '../components/Header/Header';
import PageFooter from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import {Outlet} from 'react-router-dom';

const PublicLayout: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 0]}>
    <Layout>
        <PageHeader />
    </Layout>
    <Layout  style={{ padding: '20px' }}>
      <Breadcrumbs />
      <Outlet />
    </Layout>
    <Layout>
      <PageFooter />
    </Layout>
  </Space>
);

export default PublicLayout;