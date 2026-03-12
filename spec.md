# EduReach

## Current State
- Payment modal (PaymentMethodModal.tsx) has 4 tabs: UPI (PhonePe, Google Pay, Paytm, BHIM, Amazon Pay, CRED), QR, Card, More (PayPal, Net Banking, Wallets).
- FeeStructure.tsx shows course fees in a table with a simple "Payment Information" card at the bottom.
- The payment modal does not show any transaction/processing fee per payment method.
- The Fee Structure page does not show available payment methods per course or transaction fee breakdown.

## Requested Changes (Diff)

### Add
- Transaction fee label for each payment method in the PaymentMethodModal (e.g., UPI/QR: Free, PhonePe/GPay/Paytm/Amazon Pay: 0% processing, PayPal: 3% international fee, Card: 2% processing, Net Banking: 1%).
- When a payment method is selected or hovered, show the final amount (course fee + transaction fee).
- On the FeeStructure page, add a "Payment Methods Accepted" section per course row or as a dedicated section, listing all accepted methods (PhonePe, Amazon Pay, Paytm, PayPal, Google Pay, UPI, QR Code) with their fee/charges.
- A summary card on FeeStructure page showing all payment methods with their transaction fees at a glance.

### Modify
- PaymentMethodModal: show fee breakdown (course fee + payment processing fee = total) near the top badge/amount area and update it dynamically based on selected tab/method.
- FeeStructure page: update Payment Information card to show accepted payment methods with icons/logos and fee notes.

### Remove
- Nothing removed.

## Implementation Plan
1. Define PAYMENT_FEES constant (map of method -> processing fee %) in PaymentMethodModal.
2. Add active tab state tracking in PaymentMethodModal to show dynamic fee breakdown.
3. Show "Course Fee + Processing Fee = Total" breakdown in modal header area.
4. Update FeeStructure.tsx Payment Information card to show all 7 methods (PhonePe, Amazon Pay, Paytm, PayPal, Google Pay, UPI, QR) with transaction fee per method in a grid/table.
5. Ensure Enroll buttons on FeeStructure page still link to enrollment.
