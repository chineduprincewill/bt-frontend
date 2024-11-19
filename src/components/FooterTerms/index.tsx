import { Link, useNavigate } from "react-router-dom"
import './style.scss'
import { useEffect } from "react"

export const FooterTerms = ({ type }: { type: 'terms_only' | 'terms_with_copyright' }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="footer-terms">
                <div className={`flex-row centralize-y ${type}`}>
                    {
                        type === 'terms_with_copyright'
                            ? (
                                <>
                                    <p>Copyright BlackAt 2024 </p>
                                    <Link to='/terms' onClick={() => navigate('/terms')}
                                        style={{
                                            textDecoration: 'none',
                                        }}>
                                        <p>
                                            Terms of Use
                                        </p>
                                    </Link>
                                </>
                            )
                            : (
                                <>
                                    {/* Opne document in new tab */}
                                    <Link to='/terms' onClick={() => navigate('/terms')}
                                        style={{
                                            textDecoration: 'none',
                                        }}>
                                        <p>
                                            Terms of Use
                                        </p>
                                    </Link>
                                </>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export const Terms = () => {
    useEffect(() => {

    }, [])
    return (
        <>
        </>
    )
}