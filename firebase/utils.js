import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import { clientCredentials } from './clientApp';

!firebase.apps.length
  ? firebase.initializeApp(clientCredentials)
  : firebase.app();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
