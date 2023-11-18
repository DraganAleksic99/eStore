import { IFormInput } from './Checkout'
import { UseFormRegister } from 'react-hook-form'

type InputProps = {
  name: string
  register: UseFormRegister<IFormInput>
  errors: any
}

export const Input: React.FC<InputProps> = ({ name, register, errors }) => {
  return (
    <>
      <label htmlFor={`${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input
        {...register(`${name}`, {
          required: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
        })}
      />
      <p>{errors[name]?.message}</p>
    </>
  )
}
