import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Landing from '@pages/Landing';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/Signup';
import Kyc from '@pages/Kyc';
import Ramp from '@pages/Ramp';
import ProtectedRamp from '@pages/ProtectedRamp';

import TransactionHistory from '@pages/Transactions/History';
import TransactionKycDetail from '@pages/Transactions/KycDetail';
import TransactionDetail from '@pages/Transactions/Detail';
import Terms from '@pages/Terms';
import Faq from '@pages/FAQ';

import ExposedWrapper from './ExposedWrapper';
import ProtectedWrapper from './ProtectedWrapper';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedWrapper />}>
        <Route path="start" element={<Kyc />} />
        <Route path="ramp" element={<Ramp />} />
        <Route path="transactions" element={<TransactionHistory />} />
        <Route path="transactions/:txnId" element={<TransactionDetail />} />
        <Route path="kyc/ramp" element={<ProtectedRamp />} />
        <Route path="kyc/transactions/:txnId" element={<TransactionKycDetail />} />
      </Route>
      <Route path="/" element={<ExposedWrapper />}>
        <Route index element={<Landing />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="terms" element={<Terms />} />
        <Route path="faq" element={<Faq />} />
      </Route>
    </>,
  ),
);

export default router;
