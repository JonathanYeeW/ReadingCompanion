import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="pb-4">
                <nav className="navbar navbar-dark bg-secondary">
                    <span className="navbar-brand mb-0 h1">Reading Companion (Admin)</span>
                </nav>
            </div>
        )
    }
}

export default Header;
