import * as yup from 'yup'

const formSchema = yup.object().shape({
username: yup
.string()
.trim()
.required('A username is required')
.min(3, 'Username must be at least 3 characters'),

email: yup
.string()
.email('Email must be valid')
.required('Email is required'),
password:yup
.string()
.trim()
.required('A password is required')
.min(8,'Password must be at least 8 characters')
.matches(/^[A-Za-z]+$/),
tos:yup
.boolean()
.required('You must agree to the Terms of Service')
})

export default formSchema