import ActiveLink from '../../../hoc/activeLink';

const loginLink = ({ name }) => {
  return <ActiveLink href="/login" name={name} />;
};

export default loginLink;
