import { showSwal } from "@/lib/showSwal";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Update_password from "./UpdatePassword.component";
import generateRandomString from "@/utils/generateRandomString";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PasswordForm {
  password: string;
  confirm_password: string;
}

type ResetPasswordComponentProps = {
  email: string;
  setShowResetPassword: Function;
  reset: () => void;
};

function ResetPasswordComponent({
  email,
  setShowResetPassword,
  reset,
}: ResetPasswordComponentProps) {
  const [inputValue, setInputValue] = useState("");
  const [randomString, setRandomString] = useState("");
  const [showSecretCodeForm, setShowSecretCodeForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isSendSecretCode, setIsSendSecretCode] = useState(false);

  const sendSercretCode = async () => {
    try {
      setIsSendSecretCode(true);
      const generatedString: string = generateRandomString(8);
      setRandomString(generatedString);
      const subject = "Réinitialisation de mot de passe";
      const response = await fetch("/api/send-email/resetpass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: subject,
          code: generatedString,
        }),
      });
      if (response.ok) {
        setIsSendSecretCode(false);
        showSwal(
          "Email envoyé!",
          "Un code a été envoyé à votre adresse email!",
          "success"
        );
        setShowSecretCodeForm(true);
      } else console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (randomString === inputValue) {
      setShowPasswordForm(true);
      setShowSecretCodeForm(false);
    }
  };

  const handleUpdatePassword = async (password_props: PasswordForm) => {
    try {
      if (password_props.password === password_props.confirm_password) {
        const response = await fetch(`/api/reset-password/${email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(password_props),
        });
        if (response.ok) {
          showSwal("Information", "Mot de passe réinitialisé", "success");
          setShowResetPassword(false);
        } else {
          showSwal("Information", "Echec de la réinitialisattion", "error");
          console.error(response);
        }
      } else {
        showSwal(
          "Information",
          "Les mots de passe ne se correspondent pas",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="flex flex-col justify-center align-center p-4">
          <div className="">
            <h1 className="flex justify-center items-center text-customGreen text-lg gap-2">
              <Icon icon="ph:key-fill" className="text-xs sm:text-lg" />
              <span className="font-semibold">
                Réinitialisation de mot de passe
              </span>
            </h1>
          </div>
          <div className="w-full relative flex flex-col gap-2 items-center">
            <span className="text-sm sm:text-lg tracking-wider text-center mt-5 text-customBlue">
              Votre email :
            </span>
            <p
              className={`text-sm sm:text-lg w-full text-center block max-w-[400px] tracking-wider bg-customGray rounded-md py-2 text-black font-bold mb-4`}
            >
              {email}
            </p>
            {showSecretCodeForm ? (
              ""
            ) : (
              <>
                {" "}
                {!showPasswordForm && (
                  <>
                    <button
                      onClick={sendSercretCode}
                      className="w-full font-bold py-2 px-4 rounded bg-customBlue text-white hover:bg-blue-900 mt-5"
                    >
                      {isSendSecretCode ? (
                        <div className="flex flex-row gap-2 items-center justify-center">
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin  text-xl mr-2 block"
                          />
                          <p className="block"> Code en cours d'envoie...</p>
                        </div>
                      ) : (
                        "Envoyer le code secret"
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowResetPassword(false), reset();
                      }}
                      className="text-sm sm:text-lg p-2 w-fit h-fit align-middle  flex flex-row items-center justify-center gap-2 mt-2 ml-auto"
                    >
                      <Icon
                        icon="ion:arrow-back"
                        className="text-md sm:text-lg text-black block"
                      />
                      Retour
                    </button>
                  </>
                )}
              </>
            )}

            {showSecretCodeForm && !showPasswordForm && (
              <form onSubmit={handleReset} className="w-full mt-4">
                <span className="text-sm sm:text-lg text-center block text-customBlue">
                  Entrez le code secret :{" "}
                </span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Entrer le code secret"
                  className="-border--border-dark-primary-color mt-3 px-4 border-[2px] rounded-md h-[40px] w-full outline-none"
                />
                <button
                  type="submit"
                  className="w-full font-bold py-2 px-4 rounded bg-customBlue text-white hover:bg-blue-900 mt-2"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => {
                    setShowResetPassword(false), reset();
                  }}
                  className="text-sm sm:text-lg p-2 w-fit h-fit align-middle  flex flex-row items-center justify-center gap-2 mt-2 ml-auto"
                >
                  <Icon
                    icon="ion:arrow-back"
                    className="text-md sm:text-lg text-black block"
                  />
                  Retour
                </button>
              </form>
            )}
          </div>
          {showPasswordForm && (
            <Update_password
              handleSubmit={handleUpdatePassword}
              setShowResetPassword={setShowResetPassword}
              reset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
