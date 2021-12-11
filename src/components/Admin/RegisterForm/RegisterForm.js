import React, { useState } from "react";
import { Form, Icon, Input, Button, Checkbox, notification, message  } from "antd";
import { emailValidation, minLengthValidation } from "../../../utils/formValidation";
import { signUpApi } from '../../../api/user';

import "./RegisterForm.scss";

export default function RegisterForm(){
    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        repeatPassword:"",
        privacyPolicy: false
    });

    const [ formValid, setFormValid ] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const ChangeForm = e => {
        if(e.target.name === "privacyPolicy"){
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    };

    const inputValidation = e =>{
        const { type, name } = e.target;

        if (type === "email"){
            setFormValid({formValid, [name]: emailValidation(e.target) });
        }
        if (type === "password"){
            setFormValid({formValid, [name]: minLengthValidation(e.target, 6) });
        }
        if (type === "checkbox"){
            setFormValid({formValid, [name]: e.target.checked});//Aquí se valida si es true o false.
        }
    };

    const register =  async e =>{
        //e.preventDefault(); //Para que no recargue el formulario antes de la validación de los datos.
       const { email, password, repeatPassword, privacyPolicy } = formValid;

       const emailVal = inputs.email;
       const passwordVal = inputs.password;
       const repeatPasswordVal = inputs.repeatPassword;
       const privacyPolicyVal = inputs.privacyPolicy;

       if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal){
           notification["error"]({
                message: "Todos los campos son obligatorios"
            });
       }else{
           if (passwordVal !== repeatPasswordVal){
               notification["error"]({
                   message: "Las contraseñas deben ser iguales"
               });
           }else{
              const result = await signUpApi(inputs);
              
              if (!result.ok){
                  notification["error"]({
                      message: result.message
                  });
              }else{
                  notification["success"]({
                      message: result.message
                  });
                  resetForm();
              }
           }
       }
    };

    const resetForm = () =>{
        const inputs = document.getElementsByTagName("input");

        for (let i = 0; i < inputs.length; i++){
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        setInputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        });

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        });
    }

    return (
        <Form className="register-form" onFinish={register} onChange={ChangeForm}> {/* Pasamos el ChangeForm para la actualización de los campos */}
            <Form.Item>
                <Input
                    /*Siguen generando conflicto los iconos de AntD, lo validare y vemos que solución hay*/
                   /*  prefix={<Icon type="user" style={{color:"rgba(0,0,0,.25)"}}/>} */
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={ inputs.email } //Al utilizar como variable, siempre va en llaves
                />
            </Form.Item>
            <Form.Item>
                <Input
                   /*  prefix={<Icon type="user" style={{color:"rgba(0,0,0,.25)"}}/>} */
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={ inputs.password } //Al utilizar como variable, siempre va en llaves
                />
            </Form.Item>
            <Form.Item>
                <Input
                   /*  prefix={<Icon type="user" style={{color:"rgba(0,0,0,.25)"}}/>} */
                    type="password"
                    name="repeatPassword"
                    placeholder="Confirmar contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={ inputs.repeatPassword } //Al utilizar como variable, siempre va en llaves
                />
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolicy" onChange={inputValidation}  checked={inputs.privacyPolicy}>
                    He leido, comprendido y acepto las politicas de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="onFinish" className="register-form__button">
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}