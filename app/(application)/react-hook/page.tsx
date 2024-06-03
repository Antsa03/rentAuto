"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, DatePicker } from "antd";
import dayjs from "dayjs";

function ReactHookTest() {
  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Username"
            help={error ? error.message : null}
            validateStatus={error ? "error" : "success"}
          >
            <Input {...field} placeholder="Enter your username" />
          </Form.Item>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Le mot de passe doit contenir 8 caractères minimum",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Password"
            help={error ? error.message : null}
            validateStatus={error ? "error" : "success"}
          >
            <Input {...field} placeholder="Enter your password" />
          </Form.Item>
        )}
      />

      <Controller
        name="_date"
        control={control}
        rules={{
          required: "Date is required",
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Date"
            help={error ? error.message : null}
            validateStatus={error ? "error" : "success"}
          >
            <DatePicker
              ref={field.ref}
              name={field.name}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString() : null);
              }}
              placeholder=""
            />
          </Form.Item>
        )}
      />

      <Button type="default" htmlType="submit" disabled={!isValid}>
        Submit
      </Button>
    </Form>
  );
}

export default ReactHookTest;
