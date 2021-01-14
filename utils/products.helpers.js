import { firestore } from '../firebase/utils';

// add product util

export const handleAddProduct = (product) => {
  return new Promise((res, rej) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });
};

// fetch products util

export const handleFetchProducts = (
  filterType,
  startAfterDoc,
  persistProducts = []
) => {
  return new Promise((res, rej) => {
    const pageSize = 6;

    let ref = firestore
      .collection('products')
      .orderBy('createdDate')
      .startAfter(startAfterDoc || 0)
      .limit(pageSize);

    if (filterType) ref = ref.where('category', '==', filterType);

    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        res({
          data,
          latestDoc: snapshot.docs[snapshot.docs.length - 1],
          isLastPage: snapshot.empty,
        });
      })
      .catch((err) => {
        rej(err);
      });
  });
};

// fetch single product

export const handleFetchProduct = (productId) => {
  return new Promise((res, rej) => {
    firestore
      .collection('products')
      .doc(productId)
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

// delete product util

export const handleDeleteProduct = (documentID) => {
  return new Promise((res, rej) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => {
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });
};
