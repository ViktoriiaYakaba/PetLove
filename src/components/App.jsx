import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './layout/Layout';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import { refreshUser } from '../redux/users/operation';

const HomePage = lazy(() => import('../pages/HomePage'));
const FriendsPage = lazy(() => import('../pages/FriendsPage'));
const NewsPage = lazy(() => import('../pages/News'));
const LoginPage = lazy(() => import('../pages/LogIn'));
const RegisterPage = lazy(() => import('../pages/Register'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const NoticesPage = lazy(() => ('../pages/Notices.jsx'));
const AddPetPage = lazy(() => import('../pages/AddPet'));
const ProfilePage = lazy(() => import('../pages/Profile'));
const WiewesPage = lazy(() => import('../pages/Viewe'));
const FvoritesPage = lazy(() => import('../pages/Favorites'));


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);



  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path='home' element={<HomePage/>} />
          <Route path='news' element={<NewsPage/>} />
          <Route path='notices' element={<NoticesPage/>} />
          <Route path='friends' element={<FriendsPage/>} />
          <Route path='profile' element={<PrivateRoute redictedTo='home' component={<ProfilePage/>}/>} >
          <Route index element={<FvoritesPage/>} />
          <Route path='favorites' element={<FvoritesPage/>} />
          <Route path='views' element={<WiewesPage/>} />
        </Route>
        <Route path='add-pet' element={ <PrivateRoute redirectTo="/home" component={<AddPetPage/>} />} />
        <Route path='/login' element={<RestrictedRoute redirectTo="/profile" component={<LoginPage/>}/>} />
        <Route path='register' element={<RestrictedRoute redirectTo="/profile" component={<RegisterPage/>}/>}   />
          <Route path='*' element={<NotFoundPage/> } />
          </Route>
      </Routes>
    </>
  )
}

export default App;
