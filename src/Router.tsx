import RootLayout from 'components/@shared/layouts/RootLayout';
import Auth from 'pages/auth/Auth';
import Routine from 'pages/routine/Routine';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path={'/'} element={<Auth />} />
          <Route path={'/routine'} element={<Routine />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
