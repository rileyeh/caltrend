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
                <Link to='foodlog'>Food Log</Link>
                { this.props.user_id && <Link to="/" onClick={this.props.logout}>Logout</Link> }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.user.user_id
      }
  }


export default connect(mapStateToProps, { logout })(Nav)