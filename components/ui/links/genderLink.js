import Link from 'next/link';

const genderLink = ({ gender }) => {
  return (
    <Link href={`/shop/${gender}`}>
      <a>{gender}</a>
    </Link>
  );
};

export default genderLink;
