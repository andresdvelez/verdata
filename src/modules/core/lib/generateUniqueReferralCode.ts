export function generateUniqueReferralCode() {
  return `REF_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}
