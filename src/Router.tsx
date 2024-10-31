import RootLayout from 'components/@shared/layouts/RootLayout';
import { Providers } from 'components/providers/Providers';
import Landing from 'pages/landing/Landing';
import Routine from 'pages/routine/Routine';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Providers>
        <RootLayout>
          <Routes>
            <Route path={'/'} element={<Landing />} />
            <Route path={'/routine'} element={<Routine />} />
          </Routes>
        </RootLayout>
      </Providers>
    </BrowserRouter>
  );
}
