import { Layout, Menu, theme } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { HeaderComponent } from './components/Header';
import { Projects } from './pages/Projects';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Tasks } from './pages/Tasks';
import { setUser } from './redux/features/userSlice';
const { Header, Content } = Layout;



const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  React.useEffect(() => {
    dispatch(setUser(user))
  },[])
  return (
    <>

      <Layout style={{ height: '100vh', overflow: 'scroll' }} className="layout">
        <HeaderComponent />
        <Layout>
          <Content style={{ padding: '20px 30px', display: "flex", justifyContent: "center" }}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="tasks" element={<Tasks />} />  
              <Route path="projects" element={<Projects />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
