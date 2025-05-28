import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor() {
    const serviceAccountPath =
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return this.firebaseApp.auth().verifyIdToken(token);
  }
}
