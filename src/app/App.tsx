import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Main from '../common/components/Main';
import HomePage from '../features/public-ui/pages/HomePage';
import LoginPage from '../features/authenticate/pages/LoginPage';
import SignUpPage from '../features/authenticate/pages/SignUpPage';
import Contact from '../features/public-ui/pages/Contact';
import About from '../features/public-ui/pages/About';
import CreateNewServer from '../features/game-servers/pages/CreateNewServer';
import Dashboard from '../features/game-servers/pages/Dashboard';
import UserInfo from '../features/user-profile/pages/UserInfo';
import ValidateEmail from '../features/authenticate/pages/ValidateEmail';
import Game from '../features/game/pages/Game';
import SinglePlayer from '../features/game/pages/SinglePlayer';
import NotFound from '../common/components/NotFound';
import ProtectedRoutes from '../common/components/ProtectedRoutes';
import { socket } from '../common/service/socket';
import { setConnected, setSocketId } from './redux/UserSlice';
import GetReduxStore from '../common/hooks/GetStore';

function App() {
  const dispatch = useDispatch();
  const {
    user: { loggedIn },
    game: { leftGame },
  } = GetReduxStore();
  useEffect(() => {
    // only connect once in entire app when the app loads
    socket.on('connect', () => {
      dispatch(setConnected());
    });
    socket.on('myId', (data) => {
      dispatch(setSocketId(data));
    });
    return () => {
      socket.off('connect');
    };
  }, []);
  useEffect(() => {
    if (leftGame) {
      window.location.reload();
    }
  }, [leftGame]);
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/emailvalidation" element={<ValidateEmail />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/userinfo"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <UserInfo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/createserver"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <CreateNewServer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/game/:id"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <Game />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/singleplayer"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <SinglePlayer />
            </ProtectedRoutes>
          }
        />
      </Route>
      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
