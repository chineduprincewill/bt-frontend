import './style.scss'

export const RightHero = ({ artistProfilePicture, currentPage, heroImage }: { artistProfilePicture?: string, currentPage?: number, heroImage: string }) => {
    artistProfilePicture
    currentPage

    return (
        <div className="right-hero">
            <div className="__pane right">
                <div className="right-pane">
                    <div className="pane-container">
                        <div className="illustration">
                            <img className="illu-img" src={heroImage} alt="" />
                            <div className="dark-gradient"></div>
                        </div>
                        {/* <ProfileComponent
                            ArtistProfile={artistProfilePicture}
                            ArtistName='Davido'
                            ArtistLabel='Afrobeats top musician'
                            description='Hi, folks! Onboarding flows are a way to introduce new users or current customers to a user interface or new feature'
                            page={currentPage}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}