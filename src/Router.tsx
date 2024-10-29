import Auth from 'pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
