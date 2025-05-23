import axios from 'axios';
import { User } from '@hooks/useUser/types';

type GetUserDataRequest = (endpoint: string) => Promise<Partial<User>>;
export const getUserData: GetUserDataRequest = (endpoint) =>
  axios
    .get(endpoint)
    .then(({ data }) => ({
      id: data.id,
      kycLevel: data.kyc_level,
      externalId: data.external_id,
      firstName: data.first_name,
      lastName: data.last_name,
      killbId: data.killb_id,
      dateOfBirth: data.date_of_birth,
      phone: data.phone,
      nationalIdNumber: data.national_id_number,
      email: data.email,
      currentDepositUsageUsd: Math.abs(parseFloat(data.current_deposit_usage_usd)),
      currentWithdrawalUsageUsd: Math.abs(parseFloat(data.current_withdrawal_usage_usd)),
      resetAt: data.reset_at,
      complianceUrl: data.compliance_url,
      active: data.active,
      onboardingStatus: data.status,
    }))
    .catch((error) => {
      if (error.response.data.success) return Promise.resolve({ kycLevel: 0 });
      return Promise.reject(error);
    });
