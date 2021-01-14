import ActiveLink from '../../../hoc/activeLink';

const shopLink = ({ name }) => {
  return <ActiveLink href="/shop" name={name} />;
};

export default shopLink;
