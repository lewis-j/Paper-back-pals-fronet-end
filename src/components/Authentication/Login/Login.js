import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginGoogle, loginWithForm } from "../../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import "../authentication.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import * as condition from "../../../redux/status";
import auth from "../auth.module.scss";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import ErrMsg from "../ErrorMsg/ErrorMsg.module.scss";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const {
    currentUser,
    status,
    error: asyncErrors,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const loading = status === condition.LOADING;

  useEffect(() => {
    if (currentUser && status === condition.SUCCEEDED) {
      navigate("/");
    }
  }, [status, currentUser, navigate]);

  const handleSubmit = async (e) => {
    setError(() => ({}));
    e.preventDefault();
    const error = {};
    if (!formValues.email) error.email = "Email is required!";
    if (!formValues.password) error.password = "Password is required!";
    if (Object.keys(error).length !== 0) return setError(error);
    dispatch(loginWithForm({ email, password }));
  };

  const handleOnChange = (e) => {
    setError({});
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { email, password } = formValues;

  return (
    <>
      <Card className={auth.container}>
        <CardBody>
          <h2 className="text-center my-4">Log In</h2>
          {asyncErrors && <div className={ErrMsg.msg}>{asyncErrors}</div>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <ErrorMsg msg={error.email}>
                <Label>Email</Label>
                <Input
                  style={
                    error.email ? { borderColor: "red", color: "red" } : {}
                  }
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
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Log In
            </Button>
            <Button
              style={{ backgroundColor: "#911f16" }}
              disabled={loading}
              className="w-100 mt-2"
              onClick={() => dispatch(loginGoogle())}
            >
              <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="../reset-password">Forgot Password?</Link>
          </div>
        </CardBody>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="../signup">Sign Up</Link>
        </div>
      </Card>
    </>
  );
}
