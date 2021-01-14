import ActiveLink from '../../../hoc/activeLink';

const cartLink = ({ badgeClass, children }) => {
  const cartBadge = <span className={badgeClass}>{children}</span>;

  return <ActiveLink href="/cart" name="Cart" extra={cartBadge} />;
};

export default cartLink;
