import React, { Fragment, useEffect, useState } from 'react';

import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useStore, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { wrapper } from '../redux';
import { PersistGate } from 'redux-persist/integration/react';
import { auth, firestore } from '../firebase/utils';
import nookies from 'nookies';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
import 'antd/dist/antd.css';

import Layout from '../containers/layout';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const dispatch = useDispatch();
  const [loadingUser, setLoadingUser] = useState(true);

  const { currentUser } = useSelector((state) => {
    return {
      currentUser: state.auth.currentUser,
    };
  });

  useEffect(() => {
    NProgress.start();

    const authListener = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(actions.getUserAdditionalData(user));
      }

      dispatch(actions.setCurrentUser(user));
      setLoadingUser(false);
      NProgress.done();
    });

    return () => authListener();
  }, []);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = firestore
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          dispatch(actions.setCurrentUser(doc.data()));
        });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.set(undefined, 'token', '', {});
        nookies.set(undefined, 'uROu', '', {});
        return;
      }

      const token = await user.getIdToken();
      // setUser(user);
      nookies.set(undefined, 'token', token, {});
    });
  }, []);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.userRoles &&
      currentUser.userRoles === 'admin'
    ) {
      const uROu = '1jh09dgj46yqz0h';
      nookies.set(undefined, 'uROu', uROu, {});
    }
  }, [currentUser]);

  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Kickz</title>
      </Head>

      {loadingUser && <div></div>}

      {!loadingUser && (
        <PersistGate persistor={store.__persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      )}
    </Fragment>
  );
}

export default wrapper.withRedux(MyApp);
