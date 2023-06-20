import {RouterProvider} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { routes } from "./routes/Routes"

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#cc0000',
        },
      }}
    >
      <RouterProvider router={routes} />
    </ConfigProvider>
  )
}

export default App
