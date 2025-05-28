import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigType } from '@nestjs/config';
import config from '../config/config';

@Injectable()
export class FirebaseService {
  private readonly firebaseApp: admin.app.App;

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    const firebaseConfig = this.configService.firebase;
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: firebaseConfig.projectId,
          privateKey: firebaseConfig.privateKey?.replace(/\\n/g, '\n'),
          clientEmail: firebaseConfig.clientEmail,
        }),
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return this.firebaseApp.auth().verifyIdToken(token);
  }
}
