import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Landing from '@pages/Landing';
import SignIn from '@pages/SignIn';
import Kyc from '@pages/Kyc';
import Ramp from '@pages/Ramp';
import ProtectedRamp from '@pages/ProtectedRamp';
import TransactionDetail from '@pages/TransactionDetail';

import ExposedWrapper from './ExposedWrapper';
import ProtectedWrapper from './ProtectedWrapper';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedWrapper />}>
        <Route path="kyc" element={<Kyc />} />
        <Route path="ramp" element={<Ramp />} />
        <Route path="ramp/:txnId" element={<TransactionDetail />} />
        <Route path="kyc/ramp" element={<ProtectedRamp />} />
        <Route path="kyc/ramp/:txnId" element={<TransactionDetail />} />
      </Route>
      <Route path="/" element={<ExposedWrapper />}>
        <Route index element={<Landing />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </>,
  ),
);

export default router;
