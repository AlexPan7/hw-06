import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname
  const paths = pathname.split('/').filter(x => x)

  return (
    <Breadcrumb style={{ 
      textTransform: 'capitalize',
      padding: '0 0 10px'
    }}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {paths.map((path, i) => (
        <Breadcrumb.Item key={i}>
          {path}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
