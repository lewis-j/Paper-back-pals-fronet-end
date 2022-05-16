import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/user/userSlice";
import * as condition from "../../../redux/status";
// import { useAuthState } from "react-firebase-hooks/auth";
import "../authentication.scss";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customError, setCustomError] = useState("");
  // const [user, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    currentUser: user,
    status,
    error,
  } = useSelector((state) => state.user);

  const loading = status === condition.LOADING;

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomError("");
    if (password !== confirmPassword) {
      return setCustomError("Passwords do not match");
    }
    let trimmedName = name;
    trimmedName = trimmedName.trim().replace(/\s+/g, " ");

    dispatch(registerUser({ username: trimmedName, email, password }));
  };

  return (
    <>
      <Card className="authentication">
        <CardBody>
          <h2 className="text-center- mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {customError && <Alert variant="danger">{customError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="name">
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup id="email">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup id="password">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup id="password-confirm">
              <Label>Password Confirmation</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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
