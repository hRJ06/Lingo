/** @type {import('postcss-load-config').Config} */
import {setupDevPlatform} from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}
const config = {
    plugins: {
        tailwindcss: {},
    },
};

export default config;
