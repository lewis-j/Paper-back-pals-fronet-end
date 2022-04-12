import React, { useEffect, useRef } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginEmailPsw, loginGoogle } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    loginEmailPsw(emailRef.current.value, passwordRef.current.value);
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/search");
    }
  }, [user, loading]);

  return (
    <>
      <Card>
        <CardBody>
          <h2 className="text-center- my-4">Log In</h2>
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <Label>Email</Label>
              <Input type="email" ref={emailRef} required />
            </FormGroup>
            <FormGroup id="password">
              <Label>Password</Label>
              <Input type="password" ref={passwordRef} required />
            </FormGroup>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Log In
            </Button>
            <Button
              color="danger"
              disabled={loading}
              className="w-100 mt-2"
              onClick={loginGoogle}
            >
              Sign in With Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/reset-password">Forgot Password?</Link>
          </div>
        </CardBody>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </>
  );
}
