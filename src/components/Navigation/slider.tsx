// NavigationComponent.js

// import PropTypes from 'prop-types';
import './style.scss';

const lastPage = 5;
const NavigationComponent = ({ currentPage }: { currentPage: number }) => (
    <div className="lower-navigation">

        {currentPage === 1 && (
            <>
                <div className="navigation-rectangle"></div>
                <div className="navigation-ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#545454" />
                    </svg>
                </div>
                <div className="navigation-ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#545454" />
                    </svg>
                </div>
            </>
        )}


        {currentPage > 1 && currentPage < lastPage && (
            <>
                <div className="navigation-ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#545454" />
                    </svg>
                </div>
                <div className="navigation-rectangle"></div>
                <div className="navigation-ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#545454" />
                    </svg>
                </div>
            </>
        )}

        {currentPage === lastPage && (
            <>
                <div className="navigation-ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#545454" />
                    </svg>
                </div>
                <div className="navigation-ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#545454" />
                    </svg>
                </div>
                <div className="navigation-rectangle"></div>
            </>
        )}
    </div>
);

// NavigationComponent.propTypes = {
//   currentPage: PropTypes.number.isRequired,
// };

export default NavigationComponent;
