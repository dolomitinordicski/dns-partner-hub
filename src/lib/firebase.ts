import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut as fbSignOut 
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without databaseId specified
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// DEMO_MODE:
// true = accesso anonimo Firebase (la demo funziona contro le regole chiuse).
// false = produzione: email/password reali; il ruolo autorevole deve arrivare
// da un custom claim impostato lato backend, non dal client.
export const DEMO_MODE = false;

export interface SignInResult { ok: boolean; error?: string; }

/** Legacy code login intentionally disabled. Email Auth alone is not authorization. */
export async function partnerSignIn(_partnerCode: string, _password?: string): Promise<SignInResult> {
  return { ok: false, error: 'Partner authentication will be enabled after DNS server grant verification.' };
}

/** Auth identity only. Never infer partner/regional/admin roles from this result. */
export async function signInVerifiedEmail(email: string, password: string): Promise<SignInResult> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    if (!credential.user.emailVerified || credential.user.isAnonymous) {
      await fbSignOut(auth);
      return { ok: false, error: 'Email verification is required.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Authentication failed.' };
  }
}

export async function partnerSignOut(): Promise<void> {
  try { await fbSignOut(auth); } catch { /* noop */ }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection on startup
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'vouchers', '_test_connection_'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

testConnection();
