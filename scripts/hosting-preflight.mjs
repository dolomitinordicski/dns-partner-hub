import fs from 'node:fs';
const config=JSON.parse(fs.readFileSync('firebase-applet-config.json','utf8'));
const rc=JSON.parse(fs.readFileSync('.firebaserc','utf8'));
const hosting=JSON.parse(fs.readFileSync('firebase.json','utf8')).hosting;
if(rc.projects?.default!=='dns-core')throw new Error('Expected DNS project dns-core');
if(hosting?.target!=='partner-hub')throw new Error('Only dedicated partner-hub target permitted');
if(config.projectId!=='dns-core')throw new Error('Frontend still targets legacy Firebase project. Configure DNS-owned web app before deploy.');
if(config.firestoreDatabaseId && config.firestoreDatabaseId!=='(default)')throw new Error('Nondefault Firestore database requires explicit DNS review before deploy.');
console.log('DNS Hosting runtime configuration verified');
