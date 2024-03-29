import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Landing from '@pages/Landing';
import SignIn from '@pages/SignIn';
import Kyc from '@pages/Kyc';
import Ramp from '@pages/Ramp';
import ProtectedRamp from '@pages/ProtectedRamp';
import ProtectedTransactionDetail from '@pages/ProtectedTransactionDetail';
import TransactionDetail from '@pages/TransactionDetail';
import Terms from '@pages/Terms';
import Faq from '@pages/FAQ';

import ExposedWrapper from './ExposedWrapper';
import ProtectedWrapper from './ProtectedWrapper';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedWrapper />}>
        <Route path="kyc" element={<Kyc />} />
        <Route path="ramp" element={<Ramp />} />
        <Route path="transactions/:txnId" element={<TransactionDetail />} />
        <Route path="kyc/ramp" element={<ProtectedRamp />} />
        <Route path="kyc/transactions/:txnId" element={<ProtectedTransactionDetail />} />
      </Route>
      <Route path="/" element={<ExposedWrapper />}>
        <Route index element={<Landing />} />
        <Route path="terms" element={<Terms />} />
        <Route path="faq" element={<Faq />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </>,
  ),
);

export default router;
