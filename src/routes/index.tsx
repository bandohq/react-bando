import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Landing from '@pages/Landing';
import SignIn from '@pages/SignIn';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="signin" element={<SignIn />} />
    </Route>,
  ),
);

export default router;
