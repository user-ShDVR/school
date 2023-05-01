import { Layout, Menu, theme } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { useRefreshUserMutation } from './redux/api/authApi';
import { MyProjects } from './pages/MyProjects';
import { Users } from './pages/Users';
const { Header, Content } = Layout;



const App: React.FC = () => {
  const navigate = useNavigate();
  const [refreshUser, {isLoading, isSuccess, isError, error }] = useRefreshUserMutation();
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  React.useEffect(() => {
    if (user.token) {
      refreshUser({token: user.token})
    } else {
      navigate("/")
    }
  },[])

  React.useEffect(() => {
		if (isSuccess) {
			navigate('profile');
		}

		if (isError) {
		  navigate("/")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

//Users
// const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
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
              <Route path="users" element={<Users />} />  
              <Route path="my-projects" element={<MyProjects />} />  
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
