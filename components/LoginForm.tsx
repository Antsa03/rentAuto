import { Button, Input } from "antd";
import { signIn } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";

function LoginForm() {
  const [user, setUser] = useState<Login>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleAuthentication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        alert(res?.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleAuthentication}
        className="border-[1px] border-black w-[700px]"
      >
        <div>
          <label htmlFor="email">Email *</label>
          <Input
            allowClear
            name="email"
            value={user.email}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div>
          <label htmlFor="">Mot de passe</label>
          <Input.Password
            allowClear
            name="password"
            value={user.password}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <Button
          type="default"
          className="bg-blue-500 text-white"
          htmlType="submit"
        >
          Se connecter
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
