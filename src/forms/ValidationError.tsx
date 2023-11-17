import React from 'react'

type ValidationErrorProps = {
  errors: string[] | undefined
}

export const ValidationError: React.FC<ValidationErrorProps> = ({ errors }) => {
  if (errors) {
    return (
      <>
        {errors.map(err => (
          <h6 className="text-danger" key={err}>
            {err}
          </h6>
        ))}
      </>
    )
  } else {
    return null
  }
}
