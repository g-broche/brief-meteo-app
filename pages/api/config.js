import { readFileSync } from 'fs';

export default async function getConfig() {
    const configFile = readFileSync(process.cwd() + '/api-config.json', 'utf8');
    const data = JSON.parse(configFile);
    return data;
}