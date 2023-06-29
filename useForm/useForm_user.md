# useForm-lib User Documentation

## Table of Contents

1. Introduction
2. Installation
3. Basic Usage
4. Form Configuration
5. Form Fields
6. Validation
7. Form Submission
8. Error Handling
9. Advanced Features
10. API Reference

## 1. Introduction

Welcome to the useForm-lib user documentation! useForm-lib is a powerful npm library that provides functions and components for handling forms in ReactJS. It simplifies the implementation of form functionalities such as form validation, form submission handling, loading state management, and more.

With useForm-lib, you can easily create robust and interactive forms in your React applications. It abstracts away the complexities of form handling, allowing you to focus on creating a seamless user experience.

## 2. Installation

To get started with useForm-lib, you need to install the library in your React project. Here are the steps to install it:

1. Open your terminal or command prompt.

2. Navigate to the root directory of your React project.

3. Run the following command to install the "useForm-lib" npm package:

    ```shell
    npm install useForm-lib
    ```

    This command will download and install the useForm-lib package from the npm registry and add it as a dependency in your project's package.json file.

4. Wait for the installation process to complete.

Once you have successfully installed the useForm-lib library, you can begin using its features to handle forms in your React components.

## 3. Basic Usage

To use useForm-lib in your React components, follow these steps:

1. Import the necessary components and functions from the useForm-lib library:

    ```jsx
    import { useForm, Form, Input, Submit } from 'useForm-lib';
    ```

2. Define your form fields and their configurations using the `Input` component:

    ```jsx
    const fields = {
        username: {
            value: '',
            validator: [value => value.length > 0 || 'Username is required'],
        },
        password: {
            value: '',
            validator: [
                value => value.length > 0 || 'Password is required',
                value =>
                    value.length >= 6 ||
                    'Password should be at least 6 characters',
            ],
        },
    };
    ```

3. Initialize the form using the `useForm` hook:

    ```jsx
    const { values, onChangeHandler, errors, submitValidator } =
        useForm(fields);
    ```

4. Create a form using the `Form` component and include the form fields:

    ```jsx
    <Form onSubmit={handleSubmit}>
        <Input
            name='username'
            value={values.username}
            onChange={onChangeHandler}
            error={errors.username}
            placeholder='Enter your username'
        />
        <Input
            name='password'
            value={values.password}
            onChange={onChangeHandler}
            error={errors.password}
            placeholder='Enter your password'
            type='password'
        />
        <Submit>{loading => (loading ? 'Loading...' : 'Submit')}</Submit>
    </Form>
    ```

5. Implement the `handleSubmit` function to handle form submission:

    ```jsx
    const handleSubmit = async () => {
        if (submitValidator()) {
            // Perform form submission logic here
        }
    };
    ```

By following these steps, you can create a basic form with validation and submission handling using the useForm-lib library.

## 4. Form Configuration

The useForm-lib library allows you to configure various aspects of your form. Here are some common configuration options:

-   `initialValues`: An object that defines the initial values of the form fields.
-   `config`: Additional configuration options for the form, such as disabling the form

, setting the submit button's text, etc.

-   `submitHandler`: A function to handle form submission.
-   `onSubmit`: A callback function invoked after successful form submission.

You can customize these configurations according to your specific requirements.

## 5. Form Fields

The useForm-lib library provides a variety of form field components, such as `Input`, `Textarea`, `Checkbox`, `Radio`, and more. These components allow you to capture user input and apply validation rules.

To use a form field component, include it within the `Form` component and provide the necessary props, such as `name`, `value`, `onChange`, `error`, and `placeholder`. You can also customize the appearance and behavior of the form fields using CSS classes and styles.

## 6. Validation

Form validation is a crucial part of any form handling process. With useForm-lib, you can easily define validation rules for your form fields and display error messages accordingly.

To add validation to a form field, specify a validator function or an array of validator functions in the form field's configuration. These validator functions should return an error message if the validation fails.

The useForm-lib library provides various utility functions to simplify common validation tasks, such as checking for required fields, validating email addresses, and more. You can also create custom validator functions to meet your specific validation requirements.

## 7. Form Submission

Handling form submission is made simple with useForm-lib. When the user submits the form, you can validate the form fields and perform any necessary data processing or API calls.

To handle form submission, define a submit handler function and invoke it when the form is ready to be submitted. Use the `submitValidator` function provided by the useForm hook to validate the form fields before performing the submission logic.

You can also implement additional logic, such as displaying loading indicators or disabling the form during the submission process, to enhance the user experience.

## 8. Error Handling

Error handling is an essential aspect of form validation and submission. useForm-lib provides mechanisms to handle errors and display error messages to the user.

The library automatically tracks errors for each form field based on the validation rules defined. You can access the errors for each field through the `errors` object returned by the useForm hook.

By displaying the error messages next to the corresponding form fields, you can provide meaningful feedback to the user and guide them in correcting any validation errors.

## 9. Advanced Features

The useForm-lib library offers advanced features to further enhance your form handling capabilities. Some of these features include:

-   Dynamic form fields: Adding or removing form fields dynamically based on user actions or specific conditions.
-   Conditional validation: Applying validation rules conditionally based on the form field values or other factors.
-   Custom components: Integrating custom form field components or extending the library's existing components to suit your UI requirements.
-   Form state management: Accessing and managing the form state, such as touched fields, dirty fields, and more.

These advanced features provide flexibility and extensibility, allowing you to build complex and interactive forms in your React applications.

## 10. API Reference

For detailed information on the APIs, components, and utility functions provided by the useForm-lib library, refer to the API reference documentation. It covers the complete list of available options, props, and methods, along with their descriptions and usage examples.

---

Congratulations! You have completed the user documentation for the useForm-lib library. Feel free to explore the different sections and refer to the documentation whenever you need guidance on using the library's features. Happy form handling!
