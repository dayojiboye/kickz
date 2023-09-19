import { firestore } from '../firebase/utils';

// save user's order

export const handleSaveOrder = (order) => {
  return new Promise((res, rej) => {
    firestore
      .collection('orders')
      .doc()
      .set(order)
      .then(() => {
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });
};

// get user's order history

export const handleGetUserOrderHistory = (userId) => {
  return new Promise((res, rej) => {
    let ref = firestore.collection('orders').orderBy('orderCreatedDate', "desc");
    ref = ref.where('orderUserID', '==', userId);

    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        res({ data });
      })
      .catch((err) => {
        rej(err);
      });
  });
};

// get a single order details

export const handleGetOrderDetails = (orderId) => {
  return new Promise((res, rej) => {
    firestore
      .collection('orders')
      .doc(orderId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          res(snapshot.data());
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};
