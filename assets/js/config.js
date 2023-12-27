const isDevelopment = window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.startsWith('192.168.');

const config = {
  DB_URL: isDevelopment
    ? 'http://localhost:3000'
    : 'https://elitetask-dynamics.onrender.com',
  IS_DEVELOPMENT: isDevelopment,
};

window.config = config;