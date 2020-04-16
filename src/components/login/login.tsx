import React /*, { useState, ChangeEvent, useContext } */ from 'react';
// import { Button, TextField } from '@material-ui/core';
// import http from 'services/http';
// import history from 'utils/history';

// import { setAuthData } from 'store/actions/actions';
// import { StoreContext } from 'store/reducers/reducer';
// import Loader from 'components/loader/loader';

const Login: React.FC = () => {
  // const {dispatch} = useContext(StoreContext);

  // type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

  // const [invalidData, setInvalidData] = useState(false);

  // const [email, setEmail] = useState<string | null>("");
  // const handleChangeEmail = (e: InputEvent) => {
  //   setInvalidData(false);
  //   setEmail(e.target.value);
  // };

  // const [password, setPassword] = useState<string | null>("");
  // const handleChangePassword = (e: InputEvent) => {
  //   setInvalidData(false);
  //   setPassword(e.target.value);
  // }

  // const [isLoading, setIsLoading] = useState(false);

  // const submit = (event: any) => {
  //   event.preventDefault();

  //   let invalidSubmit = false;

  //   if (!password || password.length === 0) {
  //     setPassword(null);
  //     invalidSubmit = true;
  //   }

  //   if (!invalidSubmit) {
  //     setIsLoading(true);
  //     http({
  //       url: '/login',
  //       method: 'POST',
  //       data: {
  //         email,
  //         password,
  //       }
  //     }).then((data) => {
  //       setIsLoading(false);
  //       dispatch(setAuthData(data));
  //       history.push("/account");
  //     }).catch(() => {
  //       setIsLoading(false);
  //       setInvalidData(true);
  //     });
  //   }
  // }

  return (
    <div className="g-page-without-header-footer u-align-horizontal-center">
      {/* <form 
        onSubmit={submit} 
        className="g-form" 
        noValidate 
        autoComplete="off">
        <TextField 
            error={email === null || invalidData}
            helperText={email === null ? "Invalid email address." : ""}
            onChange={handleChangeEmail} 
            required 
            className="g-input-height u-margin-bottom-medium" 
            label="Email" />
        <TextField 
            type="password"
            error={password === null || invalidData}
            helperText={password === null ? "Invalid password" : ""}
            onChange={handleChangePassword}
            required
            className="g-input-height u-margin-bottom-min"
            label="Password" />
        <a 
          className="g-link u-margin-bottom-large u-text-align-right"
          onClick={() => history.push('/forgot-password')}>Forgot your Password?</a>
        {
          isLoading ? 
          <Loader /> : 
          <Button 
            type="submit"
            color="primary"
            variant="contained">
            Log in
          </Button>
        }
        <a 
          className="g-link u-margin-top-large u-text-align-center"
          onClick={() => history.push('/signup')}>Don't have a Vouched Account? Sign Up</a>
      </form> */}
    </div>
  );
}

export default Login;