
const required = "This Field is required";

export const FieldValidation = {
  required,
}

export const emailValidation = {
  required: "Email is required !!",
  pattern: {
    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    message: "invalid email!!",
  },
}
export const UsernameValidation = {
  required: "Username is required !!",
  minLength: {
    value: 4,
    message:
      "Username shouldn't be less than four character",
  },
  maxLength: {
    value: 30,
    message:
      "Username shouldn't be more than thirteen character",
  },
}

export const passLoginValidation = {
  required: "Password is required !!",
}
export const passRegValidation = {
  required: "Password is required !!",
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*0-9]).{5,}$/,
    message:
      "password must be 5 char, contains one uppercase letter, one lowercase letter, and  special char or number",
  },
}

export const titleValidation = {
  required: "Product title is required !!",
  minLength: {
    value: 4,
    message:
      " title shouldn't be less than four character",
  },
  maxLength: {
    value: 40,
    message:
      " title shouldn't be more than fourteen character",
  },
}


export const priceValidation = {
  required: "price is required !!",
  min: {
    value: 4,
    message:
      "price shouldn't be less than four dollars",
  },
}

export const stockValidation = {
  required: "stock is required !!",
  max: {
    value: 500,
    message:
      "stock shouldn't be more than 500",
  },
}