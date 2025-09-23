// Environment variable validation
export const validateEnvironment = () => {
  const requiredEnvVars = {
    VITE_GIPHY_API: import.meta.env.VITE_GIPHY_API,
  };

  const missingVars = [];
  
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      missingVars.push(key);
    }
  }

  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
    console.warn('Some features may not work properly. Please check your .env file.');
  }

  return missingVars.length === 0;
};

export const getEnvVar = (key, defaultValue = '') => {
  return import.meta.env[key] || defaultValue;
};
