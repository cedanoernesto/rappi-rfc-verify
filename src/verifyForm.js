import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Message,
  Popup,
  Segment,
  Transition
} from "semantic-ui-react";
export const VerifyForm = () => {
  const [errorRFC, setErrorRFC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rfc, setRfc] = useState("");
  const [password, setPassword] = useState("");
  const [validatedRfc, setValidatedRfc] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [linkAccountRespose, setLinkAccountRespose] = useState();
  const verifyRFC = async () => {
    const error = await validateRFC(null, { value: rfc });
    if (!error && !password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (rfc === "ROSS940116564") {
          setShowErrorMessage(true);
        } else {
          setValidatedRfc(true);
          setShowSuccessMessage(true);
        }
      }, 2000);

      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 10000);
    }
    if (validatedRfc && password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (rfc === "ROSS940116563") {
          setLinkAccountRespose(false);
        } else {
          setLinkAccountRespose(true);
        }
      }, 3000);
    }
  };

  const validateRFC = (e, d) =>
    new Promise((resolve, reject) => {
      if (e) {
        if (d.value.length <= 13) {
          setRfc(d.value.toUpperCase());
        }
      }
      const RFCRegex = new RegExp(
        /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/
      );
      if (d && d.value.length === 13) {
        if (RFCRegex.exec(d.value)) {
          setErrorRFC(false);
          resolve(false);
        } else {
          setErrorRFC(true);
          resolve(true);
        }
      } else if (!e) {
        setErrorRFC(true);
        resolve(true);
      }
    });
  return (
    <div className="form">
      {typeof linkAccountRespose === "boolean" && (
        <div className="form-overlay"></div>
      )}
      <div className="form-content">
        <div className="container-logo">
          <img
            className="logo"
            src="https://heru-static-assets.s3.us-east-2.amazonaws.com/alliances/rappi/rappi-logo-white.png"
          />
        </div>
        <div className="input-container">
          <label className="label">Ingresa tu RFC</label>
          <Input
            size="small"
            loading={loading}
            error={errorRFC}
            placeholder="XXXX000000000"
            focus={true}
            value={rfc}
            onChange={(e, d) => validateRFC(e, d)}
          />
          {errorRFC && (
            <Label basic color="red" pointing>
              Ingresa un RFC valido
            </Label>
          )}
          <a
            className="link"
            href="http://ayuda.somosheru.com/es/articles/5274834-como-obtener-el-rfc"
          >
            ¿No tienes RFC? Te ayudamos a obtenerlo
          </a>
          <br />
        </div>
        <Transition visible={true} animation="scale" duration={500}>
          <div className="input-container">
            <label className="label">Contraseña</label>
            <Input
              size="small"
              type="password"
              loading={loading}
              value={password}
              onChange={(e, d) => setPassword(d.value)}
              placeholder="**********"
              className="password"
              focus={true}
            />
            <br />
            <Popup
              trigger={<Button color="blue" content="Blue Pill" fluid />}
              content="The story ends. You wake up in your bed and believe whatever you want to believe."
              position="top center"
              size="tiny"
              inverted
            />
          </div>
        </Transition>
        <br />
        <Button
          className="button"
          color="black"
          loading={loading}
          onClick={() => verifyRFC()}
        >
          {validatedRfc ? "Vincular cuenta" : "Validar"}
        </Button>
        <Transition
          visible={showSuccessMessage}
          animation="scale"
          duration={500}
        >
          <div className="successMessage">
            ¡Tu RFC ha sido validado éxitosamente! Ahora, vincula tu cuenta
            fiscal.
          </div>
        </Transition>
        <Transition
          visible={linkAccountRespose === true}
          animation="scale"
          duration={500}
        >
          <div className="successMessageFinal">
            ¡Tus datos fiscales han sido vinculados éxitosamente!
            <br /> Te contactaremos en caso de que tengas que tomar algún paso
            adicional.
          </div>
        </Transition>
        <Transition
          visible={linkAccountRespose === false}
          animation="scale"
          duration={500}
        >
          <div className="errorMessageFinal">
            ⚠️ ¡Tus datos fiscales no han podido vincularse! <br /> Verifica que
            tus datos son correctos e intentalo nuevamente.
          </div>
        </Transition>
        <Transition visible={showErrorMessage} animation="scale" duration={500}>
          <div className="errorMessage">
            El RFC ingresado no existe en el SAT, si crees que esto es un error
            comunícate con nosotros.
          </div>
        </Transition>
        <div className="powered">
          Powered by
          <img
            className="logo-heru"
            src="https://heru-static-assets.s3.us-east-2.amazonaws.com/logo-heru-white.png"
          />
        </div>
      </div>
    </div>
  );
};
