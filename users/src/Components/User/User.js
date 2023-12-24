import './User.css'

const User = ({ email, name, phone, website }) => {
    return <div className='user-card'>
        <h4>email</h4><p className="user-prop-text">{email}</p>
        <h4>name</h4><p className="user-prop-text">{name}</p>
        <h4>phone</h4><p className="user-prop-text">{phone}</p>
        <h4>website</h4><p className="user-prop-text">{website}</p>
    </div>
}
User.propTypes = {
    name: PropTypes.string,
    email: PropTypes.email,
    phone: PropTypes.string,
    website: PropTypes.string,
};

User.defaultProps = {
    email: 'example@mail.com',
    name: 'John Doe',
    phone: '',
    website: ''
}

export default User;