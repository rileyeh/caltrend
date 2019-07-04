import { combineReducers } from 'redux'

import user from './user'
import meals from './meals'
import weight from './weight'

export default combineReducers({ user, meals , weight})