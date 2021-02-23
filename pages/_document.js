import Document, { Html, Head, NextScript  } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <NextScript />
      </Html>
    );
  }
}

export default MyDocument;
