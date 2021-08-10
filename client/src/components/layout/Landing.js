import React from 'react'
import { Link } from 'react-router-dom';
function Landing() {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Join The Network</h1>
                    <p className="lead">


                        Just a community that helps each other grow and develop new skills.
                        Network and Developer together!
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
