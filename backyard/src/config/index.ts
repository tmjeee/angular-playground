
import * as path from 'path';
const SelfReloadJson = require('self-reload-json');

const config = new SelfReloadJson(path.resolve(__dirname, 'config.json'));

const updateJson = async (config: any) => {
    // override / update json entries if needed, upon reload

};

(async () => {
   await updateJson(config);
})()
config.on('updated', async (json: any) => {
   await updateJson(config);
});

export default config;