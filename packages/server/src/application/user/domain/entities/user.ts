import { Entity } from "@core/domain/entity"

type UserProps = {
  name: string
  email: string
  password: string
}

export class User extends Entity {
  public name!: string
  public email!: string
  public password!: string

  /**
   * PRODUCER Information
   */
  public phoneNumber!: string
  public cpf!: string

  public stripeId!: string

  private constructor(props: UserProps, id?: string) {
    super(id)
    Object.assign(this, props)
  }

  public static create(props: UserProps, id?: string) {
    const user = new User(props, id)

    return user
  }

  public setAdditionalInfo({ cpf, phoneNumber }: { cpf: string, phoneNumber: string }) {
    this.cpf = cpf
    this.phoneNumber = phoneNumber

    return this
  }

  public static validateCPF({ cpf }: { cpf: string }) {
    if(!cpf) {
      return false
    }

    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

    if(!regex.test(cpf)) {
      return false
    }

    return true
  }

  public static validatePhoneNumber({ phoneNumber }: { phoneNumber: string }) {
    if(!phoneNumber) {
      return false
    }

    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    if(!regex.test(phoneNumber)) {
      return false
    }

    return true
  }

  public static validateEmail({ email }: {email: string}) {
    if (!email || email.trim().length > 255) {
      return false
    }

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!regex.test(email)) {
      return false
    }

    return true
  }
}