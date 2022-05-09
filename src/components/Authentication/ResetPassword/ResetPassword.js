import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  Button,
  Alert,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../../network/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../authentication.scss";

export default function ResetPassword() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      await sendPasswordReset(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to login");
    }
  }

  return (
    <>
      <Card className="authentication">
        <CardBody>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
              <Label>Email</Label>
              <Input type="email" ref={emailRef} required />
            </FormGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="../">Log In</Link>
          </div>
        </CardBody>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="../signup">Sign Up</Link>
        </div>
      </Card>
    </>
  );
}
