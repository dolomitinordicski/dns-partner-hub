import fs from 'node:fs';
const rc=JSON.parse(fs.readFileSync('.firebaserc','utf8'));
const hosting=JSON.parse(fs.readFileSync('firebase.json','utf8')).hosting;
if(rc.projects?.default!=='dns-core')throw new Error('Expected DNS project dns-core');
if(hosting?.target!=='partner-hub')throw new Error('Only dedicated partner-hub target permitted');
if(process.env.VITE_DNS_FIREBASE_PROJECT_ID!=='dns-core')throw new Error('DNS Firebase project ID must be dns-core');
for(const key of ['VITE_DNS_FIREBASE_API_KEY','VITE_DNS_FIREBASE_AUTH_DOMAIN','VITE_DNS_FIREBASE_APP_ID']) {
  if(!process.env[key])throw new Error('Missing DNS Firebase web app setting: '+key);
}
console.log('DNS Hosting configuration verified');
