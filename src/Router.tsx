import RootLayout from 'components/@shared/layouts/RootLayout';
import Auth from 'pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path={'/'} element={<Auth />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
