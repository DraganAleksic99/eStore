import { IFormInput } from './Checkout'
import { UseFormRegister, Path } from 'react-hook-form'
import './Input.css'

type InputProps = {
  name: Path<IFormInput>
  register: UseFormRegister<IFormInput>
  errors: any
}

export const Input: React.FC<InputProps> = ({ name, register, errors }) => {
  return (
    <>
      <div className="form-control mb-2" key={name}>
        <label htmlFor={`${name}`}>{name}</label>
        <input
          className={`form-control ${errors[name] && 'input'}`}
          {...register(`${name}`)}
          id={`${name}`}
          placeholder={`${name}`}
        />
        <p style={{ marginTop: '5px' }}>{errors[name]?.message}</p>
      </div>
    </>
  )
}
