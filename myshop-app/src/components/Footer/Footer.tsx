import { Layout } from 'antd';

const { Footer } = Layout;

function PageFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <Footer>
        <p>&copy; by WORKOUT in {currentYear}.</p>
      </Footer>
    </Layout>
  );
}

export default PageFooter;
