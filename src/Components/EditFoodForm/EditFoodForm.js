import React from 'react'
import { connect } from 'react-redux'

function EditFoodForm () {
    return (
        <div>
            <h4>the edit food form</h4>
        </div>
    )
}

let mapStateToProps = state => {
    console.log('STATE BY THE TIME WERE EDITING', state)
}
 
export default connect(mapStateToProps)(EditFoodForm)