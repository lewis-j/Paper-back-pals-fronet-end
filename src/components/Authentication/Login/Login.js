import React, { useEffect, useState } from "react";
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
import "../authentication.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    const msg = await loginEmailPsw(email, password);
    setError(msg);
  };

  useEffect(() => {
    if (loading) {
      console.log("loading some stuff");
      // return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <>
      <Card className="authentication">
        <CardBody>
          <h2 className="text-center my-4">Log In</h2>
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Log In
            </Button>
            <Button
              style={{ backgroundColor: "#911f16" }}
              disabled={loading}
              className="w-100 mt-2"
              onClick={loginGoogle}
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
