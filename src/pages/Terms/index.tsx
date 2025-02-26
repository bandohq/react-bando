import CleanLayout from '@layouts/CleanLayout';
import MarkDownContainer from '@components/MarkDownContainer';

export default function Terms() {
  const markdown = `
**Terms and Conditions of Use for Bando**

**Acceptance**
By registering and using Bando's services, you accept these terms and conditions, which govern our relationship with you in relation to this platform. You acknowledge the risks associated with crypto asset transactions and accept that Bando acts as an intermediary facilitating your operations.

**User Responsibilities**
It is your responsibility to ensure that crypto assets acquired through our platform comply with applicable legislation. Bando is not responsible for verifying the legality or legitimacy of the crypto assets transacted.

**Changes to Terms**
We reserve the right to modify these terms. It is your responsibility to periodically review the changes, which will be communicated through our platform and by email.

**Registration and Platform Use**
To use Bando, you must complete the registration process and comply with our KYC (Know Your Customer) policy. You are responsible for maintaining the security of your account and for all activities that occur under your access.

**Platform Operation**
Bando reserves the right to modify, update, or discontinue the platform as necessary. In case of discontinuation, users will be notified in advance.

**Services**
The platform allows the purchase and sale of crypto assets, and you are responsible for the accuracy of the information provided for transactions. Operations are not reversible once confirmed.

**Support**
Technical support is available to help with the use of the platform. We do not assume responsibility for technical problems of the user or for cyber attacks that the user may suffer.

**Intellectual Property**
Bando's services are protected by intellectual property rights and are for the exclusive use of our customers in accordance with these terms.

**Limitation of Liability**
Bando will not be responsible for losses derived from the use of the platform, for user actions that contravene these terms, or for events beyond our control.

**Final Considerations**
You may cancel your account at any time. Some data may be retained as required by law. The relationship between the parties is governed by the law of the Cayman Islands, and any dispute will be resolved in the courts of George Town.

**Consent**
By using Bando, you give your consent to these terms and to our privacy and KYC policies.`;
  return (
    <CleanLayout>
      <MarkDownContainer
        sx={{ width: '100%', maxWidth: '800px', height: 'fit-content', margin: '0 auto' }}
        content={markdown}
      />
    </CleanLayout>
  );
}
