
interface registerUser {
  user_name: string;
  password: string;
  organization_id: number;
}
type validateEmail = { user_name: string;}
type loginUser = { user_name: string; password: string }


type forgotPassword = { user_name: string }
type checkToken = { key: string }
type resetPass = {
  password: string
  key: string
  password_confirmation: string
}
type ParamBody = {
  user_id: number
}
type GetUserParamsBody = { user_id: number }
interface updateBody extends registerUser {
  user_id: number
  user_name: string
}

export {
  registerUser,
  validateEmail,
  loginUser,
  ParamBody,
  updateBody,
  forgotPassword,
  checkToken,
  resetPass,
  GetUserParamsBody,
}
