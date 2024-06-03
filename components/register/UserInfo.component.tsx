import React, { ChangeEvent, useState } from "react";
import { Form, Input, Radio, message } from "antd";
import { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import UtilisateurType from "@/types/utilisateur.type";

type UserInfo = {
  isUpdate: boolean;
  control: Control<UtilisateurType>;
  setFile: Function;
};

function UserInfo({ isUpdate, control, setFile }: UserInfo) {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <h2 className="my-4 text-customBlue font-bold text-xl flex gap-1 items-center">
        <Icon icon="gridicons:user" className="text-3xl" />
        <span>Information de l'utilisateur</span>
      </h2>
      <Form.Item className="">
        <div className="upload">
          {selectedImage ? (
            <img
              src={selectedImage.toString()}
              alt="Selected"
              className="border-2 rounded-full"
              width={90}
              height={90}
            />
          ) : (
            <img
              src={`/img/photo-profil/user.png`}
              alt="Image de profil"
              className="border-2 rounded-full"
              width={90}
              height={90}
            />
          )}
          <div className="round">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Icon
              icon="majesticons:camera"
              className="text-white ion-icon-title w-7 h-7"
            ></Icon>
          </div>
        </div>
      </Form.Item>
      <div className="flex gap-4">
        <Controller
          name="nom"
          control={control}
          rules={{ required: "Le nom est requis" }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              required
              label="Nom"
              help={error ? error.message : null}
              validateStatus={error ? "error" : "success"}
              className="w-full"
            >
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Controller
          name="prenom"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Prénom(s)"
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
          name="genre"
          control={control}
          rules={{ required: "Le genre est obligatoire" }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              required
              label="Genre"
              help={error ? error.message : null}
              validateStatus={error ? "error" : "success"}
              className="w-full"
            >
              <Radio.Group {...field}>
                <Radio value="M"> Masculin </Radio>
                <Radio value="F"> Féminin </Radio>
              </Radio.Group>
            </Form.Item>
          )}
        />
        <Controller
          name="adresse"
          control={control}
          rules={{ required: "L'adresse est obligatoire!" }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              required
              label="Adresse"
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
          name="telephone"
          control={control}
          rules={{
            required: "Le téléphone est obligatoire!",
            minLength: { value: 8, message: "Minimum 10 caractères" },
            maxLength: { value: 14, message: "Maximum 14 caractères" },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              required
              label={"Téléphone"}
              help={error ? error.message : null}
              validateStatus={error ? "error" : "success"}
              className="w-full"
            >
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "L'email est obligatoire",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
              message: "Le format de l'adresse email est invalide",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              required
              label="Email"
              help={error ? error.message : null}
              validateStatus={error ? "error" : "success"}
              className="w-full"
            >
              <Input {...field} />
            </Form.Item>
          )}
        />
      </div>
      {!isUpdate && (
        <div className="flex gap-4">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Le mot de passe est obligatoire!",
              minLength: { value: 8, message: "Minimum 8 caractères" },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Mot de passe"
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input.Password {...field} />
              </Form.Item>
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            rules={{
              required: "La confirmation de mot de passe est obligatoire!",
              minLength: { value: 8, message: "Minimum 8 caractères" },
              validate: (value: string) => {
                if (value !== control._getWatch("password")) {
                  return "Les mots de passe saisis ne sont pas identiques";
                }
                return true; // Validation réussie
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                required
                label="Confirmation de mot de passe"
                help={error ? error.message : null}
                validateStatus={error ? "error" : "success"}
                className="w-full"
              >
                <Input.Password {...field} />
              </Form.Item>
            )}
          />
        </div>
      )}
    </>
  );
}

export default UserInfo;
