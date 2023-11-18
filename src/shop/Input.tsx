import { IFormInput } from './Checkout'
import { UseFormRegister, Path } from 'react-hook-form'

type InputProps = {
  name: Path<IFormInput>
  register: UseFormRegister<IFormInput>
  errors: any
}

export const Input: React.FC<InputProps> = ({ name, register, errors }) => {
  return (
    <>
      <div className="form-control" key={name}>
        <label htmlFor={`${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
        <input
          className="form-control"
          {...register(`${name}`, {
            required: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          })}
        />
        <p>{errors[name]?.message}</p>
      </div>
    </>
  )
}
