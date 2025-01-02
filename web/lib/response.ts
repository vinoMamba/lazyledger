export const resOk = <T>(message: string, data?: T) => {
  return {
    code: 200,
    message,
    data
  }
}

export const resErr = <T>(message: string, data?: T) => {
  return {
    code: 500,
    message,
    data
  }
}

export const res = <T>(code: number, message: string, data?: T) => {
  return {
    code,
    message,
    data
  }
}
