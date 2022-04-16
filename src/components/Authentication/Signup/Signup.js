import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  Input,
  Label,
  FormGroup,
  CardBody,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [customError, setCustomError] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function handleSubmit(e) {
    e.preventDefault();
    setCustomError("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setCustomError("Passwords do not match");
    }
    registerWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then(() => {
      navigate("/");
    });
  }

  return (
    <>
      <Card>
        <CardBody>
          <h2 className="text-center- mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {customError && <Alert variant="danger">{customError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <Label>Email</Label>
              <Input type="email" ref={emailRef} required />
            </FormGroup>
            <FormGroup id="password">
              <Label>Password</Label>
              <Input type="password" ref={passwordRef} required />
            </FormGroup>
            <FormGroup id="password-confirm">
              <Label>Password Confrimation</Label>
              <Input type="password" ref={passwordConfirmRef} required />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Sign up
            </Button>
          </Form>
        </CardBody>
        <div className="w-100 text-center mt-2">
          Have an account? <Link to="../">Log In</Link>{" "}
        </div>
      </Card>
    </>
  );
}
