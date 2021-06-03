import {
  Button,
  Header,
  Input,
  Label,
  Modal,
  Transition
} from "semantic-ui-react";
import React, { useState } from "react";
import "./styles.css";
import { VerifyForm } from "./verifyForm";

export default function App() {
  return (
    <div className="App">
      <Modal size="tiny" open={true} dimmer={"inverted"}>
        <Modal.Content>
          <Transition visible={true} animation="scale" duration={500}>
            <VerifyForm />
          </Transition>
        </Modal.Content>
      </Modal>
    </div>
  );
}
