export interface Posts {
  data: Data
}

export interface Data {
  count: number
  items: Items[]
}

export interface Items {
  id: number
  message: string
  user: User
  union: Union
  photos: Photos[]
}

export interface User {
  id: number
  firstName: string
  lastName: string
  photo: Photo
}

export interface Photo {
  original: string
}

export interface Union {
  id: number
  description: string
  photo: Photo2
}

export interface Photo2 {
  original: string
}


export interface Photos {
  id: number
  photo: Photo4
  description: any
}

export interface Photo4 {
  original: string
}

