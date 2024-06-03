import { Vehicule } from "@prisma/client";
import { Form, FormInstance, Input, InputNumber, Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";
import ModalFooter from "../ui/ModalFooter.component";

type VehiculeFormProps = {
  onFinish: () => void;
  onCancel: () => void;
  control: Control<Vehicule>;
  isValid: boolean;
  setFile: Function;
  form: FormInstance;
};

function VehiculeForm({
  onFinish,
  onCancel,
  control,
  isValid,
  setFile,
  form,
}: VehiculeFormProps) {
  return (
    <>
      <Form layout="vertical" onSubmitCapture={onFinish} form={form}>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="immatriculation"
            rules={{ required: "L'immatriculation est requise!" }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Immatriculation"
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input {...field} />
              </Form.Item>
            )}
          />

          <Form.Item
            label="Image du véhicule"
            name="image_vehicule"
            required
            className="w-full"
            rules={[
              {
                required: true,
                message: "L'image du véhicule est obligatoire",
              },
            ]}
          >
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
          file:bg-gray-500 file:text-white
          hover:file:bg-gray-700"
              onChange={(e) => {
                setFile(e.target.files![0]);
              }}
            />
          </Form.Item>
        </div>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="marque"
            rules={{ required: "La marque est requise" }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Marque"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="modele"
            rules={{ required: "Le modèle est requis" }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Modèle"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="annee"
            rules={{ required: "L'année est requise", pattern: /^[0-9]+$/ }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Année"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <InputNumber {...field} />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="kilometrage"
            rules={{ required: "Le kilometrage est requis" }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Kilometrage"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <InputNumber {...field} />
              </Form.Item>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="carburant"
            rules={{ required: "Le carburant est requis" }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Type de carburant"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Select
                  defaultValue=""
                  options={[
                    { value: "Essence", label: "Essence" },
                    { value: "Diesel", label: "Diesel" },
                  ]}
                  style={{ width: 150 }}
                  {...field}
                />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="nbr_place"
            rules={{
              required: "Le nombre de place est requis",
              pattern: /^[0-9]+$/,
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Nombre de place"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <InputNumber {...field} />
              </Form.Item>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="categorie"
            rules={{ required: "Le catégorie est requis" }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Catégorie"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Select
                  defaultValue=""
                  options={[
                    { value: "Monospace", label: "Monospace" },
                    { value: "Compacte", label: "Compacte" },
                    { value: "SUV", label: "SUV" },
                    { value: "Berline", label: "Berline" },
                    { value: "Citadine", label: "Citadine" },
                  ]}
                  style={{ width: 250 }}
                  {...field}
                />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="prix_par_jour"
            rules={{
              required: "Le prix par jour est requis",
              pattern: /^[0-9]+$/,
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Prix par jour"
                required
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <InputNumber {...field} style={{ width: 200 }} />
              </Form.Item>
            )}
          />
        </div>
        <ModalFooter isValid={isValid} onCancel={onCancel} />
      </Form>
    </>
  );
}

export default VehiculeForm;
