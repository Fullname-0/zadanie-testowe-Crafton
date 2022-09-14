import '../../assets/scss/sections/form.scss';
import {useState} from "react";
import {sendMail} from "../../api";
import validator from 'validator';

const Form = ({content}) => {

    const [message, setMessage] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        agreement: false,
    })

    const [formValidation, setFormValidation] = useState({
        nameError: false,
        lastNameError: false,
        emailError: false,
        messageError: false,
    })

    const [handleChangeAlert, setHandleChangeAlert] = useState(false)
    const [alertContent, setAlertContent] = useState({
        title: '',
        message: '',
        severity: ''
    })

    const nameChangeHandler = (event) => {
        const value = event.target.value.trim();
        if (value.length < 2) {
            setFormValidation({
                ...formValidation,
                nameError: 'Wprowadź imię'
            })
        } else {
            setFormValidation({
                ...formValidation,
                nameError: ''
            })
        }
        setMessage((prevState) => {
            return {
                ...prevState,
                firstName: value
            }
        })
    }

    const lastnameChangeHandler = (event) => {
        const value = event.target.value.trim();
        if (value.length < 2) {
            setFormValidation({
                ...formValidation,
                lastNameError: 'Wprowadź nazwisko'
            })
        } else {
            setFormValidation({
                ...formValidation,
                lastNameError: ''
            })
        }
        setMessage((prevState) => {
            return {
                ...prevState,
                lastName: value
            }
        })
    }

    const emailChangeHandler = (event) => {
        const value = event.target.value.trim();
        if (value.length < 2) {
            setFormValidation({
                ...formValidation,
                emailError: 'Wprowadź poprawny email'
            })
        } else {
            setFormValidation({
                ...formValidation,
                emailError: ''
            })
        }
        setMessage((prevState) => {
            return {
                ...prevState,
                email: value
            }
        })
    }

    const messageChangeHandler = (event) => {
        const value = event.target.value;
        if (value.length < 2) {
            setFormValidation({
                ...formValidation,
                messageError: 'Puste pole wiadomości'
            })
        } else {
            setFormValidation({
                ...formValidation,
                messageError: ''
            })
        }
        setMessage((prevState) => {
            return {
                ...prevState,
                message: value
            }
        })
    }

    const agreementChangeHandler = () => {
        setMessage((prevState) => {
            return {
                ...prevState,
                agreement: !prevState.agreement
            }
        })
    }

    const resetInputs = () => {
        setMessage(() => {
            return {
                firstName: '',
                lastName: '',
                email: '',
                message: '',
                agreement: false
            }
        })
        setFormValidation(() => {
            return {
                nameError: false,
                lastNameError: false,
                emailError: false,
                messageError: false,
            }
        })
    }

    const validateForm = () => {
        let isValid = true;
        for (const error in formValidation) {
            const fieldValue = formValidation[error];
            if (fieldValue !== "") {
                isValid = false;
            }
        }
        for (const field in message) {
            const fieldValue = message[field];
            if (fieldValue === "") {
                isValid = false;
            }
        }
        return isValid;
    }

    const actionSend = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            handleAlert("Info", "Sprawdź wszystkie pola", "info")
            return
        }
        if(!validator.isEmail(message.email)) {
            handleAlert("Uwaga", "Podany email jest nie prawidłowy", "error")
            return
        }
        if (message) {
            sendMail(message).then((res) => {
                handleAlert("Wiadomość wysłano pomyślnie!", "Dziękujemy za wysłanie wiadomości!", "success")
                resetInputs();
            }).catch((error) => {
                console.error(error)
                handleAlert("Coś poszło nie tak!", "Spróbuj ponownie później.", "error")
            })
        }
    }

    const handleAlert = (title, message, severity) => {
        setHandleChangeAlert(true)
        setAlertContent((prevState) => {
            return {
                ...prevState,
                title: title,
                message: message,
                severity: severity
            }
        })
    }

    const blurHandleEmail = () => {
        !validator.isEmail(message.email) && setFormValidation((prevState) => {
            return {
                ...prevState,
                emailError: 'Wprowadź poprawny email'
            }
        })
    }

    const handleCloseAlert = () => {
        setHandleChangeAlert(false)
        setAlertContent(() => {
            return {
                title: '',
                message: '',
                severity: ''
            }
        })
    }

    return (
        <section className="form">
            <form className="form__container">
                <div className="form__container__heading">
                    <h3>{content.title}</h3>
                    <p>{content.describtion}</p>
                </div>
                <div className="form__container__user-data">
                    <div className={`input-box ${formValidation.nameError ? 'input-box--error' : ''}`}>
                        <input onChange={nameChangeHandler} value={message.firstName} className="input-box__name" type="text" required placeholder={content.placeholderName} required />
                        <label>{content.placeholderName}</label>
                    </div>
                    <div className={`input-box ${formValidation.lastNameError ? 'input-box--error' : ''}`}>
                        <input onChange={lastnameChangeHandler} value={message.lastName} className="input-box__lastname" type="text" required placeholder={content.placeholderLastname} required />
                        <label>{content.placeholderLastname}</label>
                    </div>
                </div>
                <div className={`input-box ${formValidation.emailError ? 'input-box--error' : ''}`}>
                    <input onChange={emailChangeHandler} onBlur={blurHandleEmail} value={message.email} className="input-box__email" type="email" required placeholder={content.placeholderMail} required />
                    <label>{content.placeholderMail}</label>
                </div>
                <div className={`input-box ${formValidation.messageError ? 'input-box--error' : ''}`}>
                    <textarea onChange={messageChangeHandler} value={message.message} className="input-box__message" rows="6" required placeholder={content.placeholderMessage} required />
                    <label>{content.placeholderMessage}</label>
                </div>
                <div className="input__checkbox-box">
                    <input onChange={agreementChangeHandler} checked={message.agreement} className="input__checkbox-mark" type="checkbox" required id="agreement" name="agreement" required />
                    <label className="input__checkbox-label" htmlFor="agreement">{content.placeholderCheckbox}</label>
                </div>
                <div className="button-box">
                    <button onClick={actionSend} type="submit" className="form__button">{content.button}</button>
                </div>
            </form>
            {handleChangeAlert &&
                <div className={`alert alert--${alertContent.severity}`}>
                    <h3>{alertContent.title}</h3>
                    <p>{alertContent.message}</p>
                    <button onClick={handleCloseAlert}>Zamknij</button>
                </div>
            }
        </section>
    )
}

export default Form
