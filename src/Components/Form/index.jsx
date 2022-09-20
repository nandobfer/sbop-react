import { Formik } from 'formik';
import React from "react";

const Form = ({children, initialValues, onSubmit}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        {React.cloneElement(children, {...props})}
                    </form>
                )
            }}

        </Formik>
    )
}

export default Form