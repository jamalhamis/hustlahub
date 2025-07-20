
// Generate unique IDs for providers, customers, and companies
export const generateUniqueId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${prefix.toUpperCase()}-${timestamp}-${randomString}`.toUpperCase();
};

// Generate provider ID
export const generateProviderId = (): string => {
  return generateUniqueId('PRV');
};

// Generate customer ID  
export const generateCustomerId = (): string => {
  return generateUniqueId('CUS');
};

// Generate company ID
export const generateCompanyId = (): string => {
  return generateUniqueId('COM');
};

// Verify ID format
export const verifyIdFormat = (id: string, type: 'provider' | 'customer' | 'company'): boolean => {
  const prefixMap = {
    provider: 'PRV',
    customer: 'CUS', 
    company: 'COM'
  };
  
  const expectedPrefix = prefixMap[type];
  const pattern = new RegExp(`^${expectedPrefix}-[A-Z0-9]+-[A-Z0-9]+$`);
  return pattern.test(id);
};
