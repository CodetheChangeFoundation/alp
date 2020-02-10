import React from "react";
import { withFormik } from 'formik';
import * as Yup from 'yup';

import CustomButton from "../components/CustomButton";
import TextInput from "../components/TextInput";
import Tickbox from "../components/TickBox";

const VolunteerSignUpFormContent = ({ classes, values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset }) => {
    return (
        <div className="new-volunteer-form">
            <form onSubmit={handleSubmit}>

                <h3 className="new-volunteer-form-subheading">Basic Information</h3>
                <div className="formRow">
                    <TextInput id="firstName" title="First name" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.firstName} error={touched.firstName && Boolean(errors.firstName)} helperText={touched.firstName ? errors.firstName : ""} required />
                    <TextInput id="lastName" title="Last name" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.lastName} error={touched.lastName && Boolean(errors.lastName)} helperText={touched.lastName ? errors.lastName : ""} required />
                </div>
                <TextInput id="email" title="Email" size="Long" onChange={handleChange} onBlur={handleBlur} value={values.email} error={touched.email && Boolean(errors.email)} helperText={touched.email ? errors.email : ""} required />

                <h3 className="new-volunteer-form-subheading">Address</h3>
                <TextInput id="streetAddress" title="Street address" size="Long" onChange={handleChange} onBlur={handleBlur} value={values.streetAddress} error={touched.streetAddress && Boolean(errors.streetAddress)} helperText={touched.streetAddress ? errors.streetAddress : ""} required />
                <div className="formRow">
                    <TextInput id="city" title="City" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.city} error={touched.city && Boolean(errors.city)} rhelperText={touched.city ? errors.city : ""} required />
                    <TextInput id="province" title="Province" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.province} error={touched.province && Boolean(errors.province)} helperText={touched.province ? errors.province : ""} required />
                </div>
                <TextInput id="postalCode" title="Postal Code" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.postalCode} error={touched.postalCode && Boolean(errors.postalCode)} helperText={touched.postalCode ? errors.postalCode : ""} required />

                <h3 className="new-volunteer-form-subheading">Emergency Contact</h3>
                <div className="formRow">
                    <TextInput id="contactFirstName" title="First name" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.contactFirstName} error={touched.contactFirstName && Boolean(errors.contactFirstName)} helperText={touched.contactFirstName ? errors.contactFirstName : ""} required />
                    <TextInput id="contactLastName" title="Last name" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.contactLastName} error={touched.contactLastName && Boolean(errors.contactLastName)} helperText={touched.contactLastName ? errors.contactLastName : ""} required />
                </div>
                <div className="formRow">
                    <TextInput id="contactRelationship" title="Relationship" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.contactRelationship} error={touched.contactRelationship && Boolean(errors.contactRelationship)} helperText={touched.contactRelationship ? errors.contactRelationship : ""} required />
                    <TextInput id="contactPhoneNumber" title="Phone number" size="Short" onChange={handleChange} onBlur={handleBlur} value={values.contactPhoneNumber} error={touched.contactPhoneNumber && Boolean(errors.contactPhoneNumber)} helperText={touched.contactPhoneNumber ? errors.contactPhoneNumber : ""} required />
                </div>
                <TextInput id="contactEmail" title="Email Address" size="Long" onChange={handleChange} onBlur={handleBlur} value={values.contactEmail} error={touched.contactEmail && Boolean(errors.contactEmail)} helperText={touched.contactEmail ? errors.contactEmail : ""} required />

                <Tickbox
                    id="mailingList"
                    onChange={handleChange}
                    checked={values.mailingList}
                    title="I would like to be added to Aunt Leah’s mailing list." // Should be moved to constants, I'm just not sure how or where
                    color="primary" />

                <div className="new-volunteer-button">
                    <CustomButton type="submit" size="small" color="primary" disabled={isSubmitting}>
                        Next
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const VolunteerSignUpForm = withFormik({
    mapPropsToValues: ({
        firstName,
        lastName,
        email,
        streetAddress,
        city,
        province,
        postalCode,
        contactFirstName,
        contactLastName,
        contactRelationship,
        contactPhoneNumber,
        contactEmail,
        mailingList
    }) => {
        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            streetAddress: streetAddress || "",
            city: city || "",
            province: province || "",
            postalCode: postalCode || "",
            contactFirstName: contactFirstName || "",
            contactLastName: contactLastName || "",
            contactRelationship: contactRelationship || "",
            contactPhoneNumber: contactPhoneNumber || "",
            contactEmail: contactEmail || "",
            mailingList: mailingList || false
        }
    },

    validationSchema: Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string()
            .email("Enter a valid email")
            .required("Required"),
        streetAddress: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        province: Yup.string().required("Required"),
        postalCode: Yup.string()
            .min(6, "Enter a valid postal code")
            .required("Required"),
        contactFirstName: Yup.string().required("Required"),
        contactLastName: Yup.string().required("Required"),
        contactRelationship: Yup.string().required("Required"),
        contactPhoneNumber: Yup.string()
            .min(10)
            .max(10)
            .required("Required"),
        contactEmail: Yup.string()
            .email("Enter a valid email")
            .required("Required")
    }),

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000)
    }
})(VolunteerSignUpFormContent);

export default VolunteerSignUpForm;