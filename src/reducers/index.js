import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import EmployeeFormReducers from './EmployeeFormReducers';
import EmployeeReducers from './EmployeeReducers';

export default combineReducers({
  auth: AuthReducers,
  employeeForm: EmployeeFormReducers,
  employees: EmployeeReducers
});
