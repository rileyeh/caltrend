import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../ducks/reducers/user'

class Nav extends Component {

    // componentDidMount() {
    //     console.log(99999, this.props)
    // }

    render() {
        return (
            <div>
                <p>Nav</p>
                <Link to='/dashboard'>Home </Link>
                <Link to='foodlog'>Food Log </Link>
                <Link to="/" onClick={this.props.logout}>Logout</Link>
            </div>
        )
    }
}


export default connect(null, { logout })(Nav)