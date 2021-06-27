import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", strength: 0 });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo, redirect]);

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   if (password !== confirmPassword) {
  //     setMessage('Passwords do not match')
  //   } else {
  //     dispatch(register(name, email, password))
  //   }
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    let ready = true;
    if (password.value !== confirmPassword) {
      ready = false;
      setMessage("Passwords do not match");
    }
    if (password.strength < 2) {
      ready = false;
      setMessage("Password is too weak");
    }
    if (name.length < 6 || name.length > 30) {
      ready = false;
      setMessage("Name has to be between 6-30 characters long");
    }
    if (ready === true) {
      dispatch(register(name, email, password.value));
    }
  };

  const evaluateStrength = (aValue) => {
    //is less than 8 characters
    if (aValue.length < 8) {
      return 0;
    }

    //has at least 8 characters but is only numbers or letters
    if (/^[a-zA-Z]+$/i.test(aValue) || /^[0-9]+$/i.test(aValue)) {
      return 1;
    }

    //is greater than 8 characters and has at least one number and letter
    if (/\d/.test(aValue) && /[a-zA-Z]/.test(aValue)) {
      return 2;
    }

    return -1;
  };

  /**
   * Called each time a new character is typed into the password input field
   * and updates the value and strength state for the password.
   * @param {Event} e
   */
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    const newState = { ...password };
    newState.value = newValue;
    newState.strength = evaluateStrength(newValue);
    setPassword(newState);
  };

  /**
   * Used to return the appropriate meter to display based on the
   * strength rating of the password.
   * @param {string} color
   * @param {number} size
   */
  const setMeter = (color, size) => {
    switch (color) {
      case "danger":
        return (
          <ProgressBar>
            <ProgressBar striped variant={color} now={size * 2} key={1} />
          </ProgressBar>
        );

      case "warning":
        return (
          <ProgressBar height="100px">
            <ProgressBar striped variant="danger" now={20} key={1} />
            <ProgressBar striped variant={color} now={40} key={2} />
          </ProgressBar>
        );

      case "success":
        return (
          <ProgressBar height="100px">
            <ProgressBar striped variant="danger" now={20} key={1} />
            <ProgressBar striped variant="warning" now={40} key={2} />
            <ProgressBar striped variant={color} now={40} key={3} />
          </ProgressBar>
        );

      default:
        break;
    }
  };

  /**
   * Called in the render to determine what kind of meter should be displayed
   * based on the strength rating of the password.
   */
  const displayMeter = () => {
    if (password.strength === 0) {
      return setMeter("danger", password.value.length);
    }

    if (password.strength === 1) {
      return setMeter("warning");
    }

    if (password.strength === 2) {
      return setMeter("success");
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            data-testid="register-name"
            type="name"
            placeholder="Enter Name (Between 6-30 characters)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            data-testid="register-email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="register-password"
            type="password"
            placeholder="Enter Password"
            value={password.value}
            onChange={handleOnChange}
          ></Form.Control>
          {displayMeter()}
          <Form.Text className="text-muted">
            * Password should be greater than 7 characters and have at least one
            letter and number.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            data-testid="register-confirmpassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          data-testid="register-btn"
          className="mt-2"
          type="submit"
          variant="primary"
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link
            data-testid="login-redirect"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
