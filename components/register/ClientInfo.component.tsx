import React from "react";
import { DatePicker, Form, Input } from "antd";
import { Control } from "react-hook-form";
import { Client } from "@prisma/client";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { Icon } from "@iconify/react/dist/iconify.js";

type ClientInfo = {
  control: Control<Client>;
};

function ClientInfo({ control }: ClientInfo) {
  return (
    <>
      <h2 className="my-4 text-customBlue font-bold text-xl flex gap-1 items-center">
        <Icon icon="raphael:customer" className="text-3xl" />
        <span>Information du client</span>
      </h2>
      <Controller
        name="permis_de_conduire"
        control={control}
        rules={{ required: "Le N° de permis de conduire est obligatoire" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            required
            label="N° de permis de conduire"
            help={error ? error.message : null}
            validateStatus={error ? "error" : "success"}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="num_cin"
        control={control}
        rules={{ required: "Le N° de CIN est obligatoire!" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            required
            label="N° de CIN"
            help={error ? error.message : null}
            validateStatus={error ? "error" : "success"}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Controller
        name="date_de_naissance"
        control={control}
        rules={{ required: "La date de naissance est obligatoire" }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            required
            label="Date de naissance"
            help={error ? error.message : null}
            validateStatus={error ? "error" : "success"}
          >
            <DatePicker
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString().slice(0, 10) : null);
              }}
            />
          </Form.Item>
        )}
      />
    </>
  );
}

export default ClientInfo;
