

import { useState } from "react";
import { auth } from "../firebase";


export function Reset() {
  const [email, setEmail] = useState("");
 const handlePasswordReset = () => {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Password reset email sent successfully!');
    })
    .catch((error) => {
      console.error(error);
    });
};

  return (
    <div>
    <form onSubmit={handlePasswordReset}>
  <label>
    Email:
    <input
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  </label>
  <button type="submit">Reset Password</button>
</form>

    </div>
  );
}

