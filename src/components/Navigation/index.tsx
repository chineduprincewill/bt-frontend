// NavigationComponent.js

// import PropTypes from 'prop-types';
import NavigationComponent from './slider';
import './style.scss';

const ProfileComponent = ({ ArtistProfile, ArtistName, ArtistLabel, description, page }: { ArtistProfile: string, ArtistName: string, ArtistLabel: string, description: string, page: number }) => (
    <div className="profile">
        <div className="profile-header">
            <img src={ArtistProfile} alt="profile picture" />
            <div className="info">
                <p className='name'> {ArtistName} </p>
                <p className="description">{ArtistLabel}</p>
            </div>
        </div>
        <p className="profile-description">{description}</p>
        <div className="navigation-component">
            <NavigationComponent currentPage= {page}/>
        </div>
    </div>

);

// NavigationComponent.propTypes = {
//   currentPage: PropTypes.number.isRequired,
// };

export default ProfileComponent;
