export interface ILogin {
  identifier: string,
  password: string
}

export interface IRegister {
  email: string
  username: string,
  password: string
}

export interface ILoginResponse {
  jwt: string
  user: {
    blocked: boolean,
    confirmed: boolean
    createdAt: string
    email: string
    id: number
    provider: string
    updatedAt: string
    username: string
  }
}

export interface IFormError {
  data: {
    data: null
    error: {
      details: object
      message: string
      name: string
      status: number
    }
  }
  status: number
}


export interface IProductsListRes {
  id: number,
  attributes: {
    title: string
    description: string
    price: number,
    createdAt: string
    updatedAt: string
    publishedAt: string
    stock: number
  }
}


export interface IProduct {
  title: string
  description: string
  price: number,
  stock: number
  thumbnail: string
}


export interface IProduct {
  data: {
    attributes: {
      createdAt: string
      publishedAt: string
      updatedAt: string
      title: string
      description: string
      price: number,
      stock: number
      thumbnail?: string
    }
    id: number
  }

}




