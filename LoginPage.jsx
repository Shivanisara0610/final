import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Sample login validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage({ onLogin }) {
  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Replace this with real authentication logic
          setTimeout(() => {
            setSubmitting(false);
            // Call your authentication function here:
            // Example: onLogin(values)
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Username</label>
              <Field type="text" name="username" style={styles.input} />
              <ErrorMessage
                name="username"
                component="div"
                style={styles.error}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>Password</label>
              <Field type="password" name="password" style={styles.input} />
              <ErrorMessage
                name="password"
                component="div"
                style={styles.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={styles.button}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Simple inline styles for demonstration
const styles = {
  container: {
    maxWidth: 400,
    margin: "60px auto",
    padding: 24,
    border: "1px solid #ddd",
    borderRadius: 8,
    boxShadow: "0 2px 12px #0001",
    background: "#fff",
  },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  inputGroup: { display: "flex", flexDirection: "column" },
  input: {
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
    border: "1px solid #aaa",
  },
  button: {
    padding: 10,
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#b00020",
    marginTop: 4,
    fontSize: 12,
  },
};
