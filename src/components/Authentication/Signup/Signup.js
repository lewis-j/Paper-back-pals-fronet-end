import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  Input,
  Label,
  FormGroup,
  CardBody,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/authUser/authUserSlice";
import * as condition from "../../../redux/status";
import authStyle from "../auth.module.scss";
import "../authentication.scss";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import ErrMsgStyle from "../ErrorMsg/ErrorMsg.module.scss";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const {
    currentUser: user,
    status,
    error: asyncErrors,
  } = useSelector((state) => state.authUser);

  const loading = status === condition.LOADING;

  useEffect(() => {
    if (user && status === condition.SUCCEEDED) {
      navigate("/");
    }
  }, [status, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(() => ({}));
    const error = {};
    if (!formValues.name) {
      error.name = error.message = "Username is required!";
      return setError(error);
    }
    if (!formValues.email) {
      error.email = error.message = "Email is required!";
      return setError(error);
    }
    if (!formValues.password) {
      error.password = error.message = "password is required!";
      return setError(error);
    }
    if (!formValues.confirmPassword) {
      error.confirmPassword = error.message = "Please confirm your password";
      return setError(error);
    }
    if (password !== confirmPassword) {
      error.password = error.message = "Passwords must match";
      return setError(error);
    }

    let trimmedName = name;
    trimmedName = trimmedName.trim().replace(/\s+/g, " ");

    dispatch(registerUser({ username: trimmedName, email, password }));
  };

  const handleOnChange = (e) => {
    setError({});
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { name, email, password, confirmPassword } = formValues;

  return (
    <>
      <Card className={authStyle.container}>
        <CardBody>
          <h2 className="text-center- mb-4">Sign Up</h2>
          {error.message && (
            <div className={ErrMsgStyle.msg}>{error.message}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="name">
              <ErrorMsg msg={error.name}>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={name}
                  name="name"
                  onChange={handleOnChange}
                />
              </ErrorMsg>
            </FormGroup>
            <FormGroup id="email">
              <ErrorMsg msg={error.email}>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                />
              </ErrorMsg>
            </FormGroup>
            <FormGroup id="password">
              <ErrorMsg msg={error.password}>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                />
              </ErrorMsg>
            </FormGroup>
            <FormGroup id="password-confirm">
              <ErrorMsg msg={error.confirmPassword}>
                <Label>Password Confirmation</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                />
              </ErrorMsg>
            </FormGroup>
            {!error.message && (
              <Button disabled={loading} className="w-100" type="submit">
                Sign up
              </Button>
            )}
          </Form>
        </CardBody>
        <div className="w-100 text-center mt-2">
          Have an account? <Link to="../">Log In</Link>{" "}
        </div>
      </Card>
    </>
  );
}
