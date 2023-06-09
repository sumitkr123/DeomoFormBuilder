import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import React from "react";

type FormFieldProps = {
  [key: string]: string | any;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  label?: string;
  name?: string;
  operations?: {
    [key: string]: (...args: any[]) => any;
  };
  otherType?: string;
  register?: UseFormRegister<FieldValues>;
  type?: string;
  passRules?: JSX.Element | string;
  options?: string[];
  max?: string;
};

export const FormField = (props: FormFieldProps): React.JSX.Element => {
  const { name, error } = props;

  let errorBlock = <></>;

  if (error && typeof error === "string") {
    name === "pass" && props.passRules
      ? (errorBlock = (
          <>
            <p style={{ color: "red" }}>{error}</p>
            <br />
            <br />
            {props.passRules}
          </>
        ))
      : (errorBlock = <p style={{ color: "red" }}>{error}</p>);
  }

  return (
    <div className="inputDiv">
      <Field {...props} />
      {errorBlock}
    </div>
  );
};

const Field = ({
  name,
  label,
  type,
  otherType,
  max,
  options,
  operations,
  formValues,
  placeholder,
  mainType,
  register,
}: FormFieldProps) => {
  let fieldBlock: any = <></>;

  switch (type) {
    case "select":
      fieldBlock = (
        <select
          className="forminputs"
          name={name}
          id={name}
          {...(register ? register(name!) : null)}
        >
          <option value={""}>Select option</option>
          {options?.map((item: string, index: number) => (
            <option key={item + index} value={item}>
              {item}
            </option>
          ))}
        </select>
      );
      break;
    case "number":
      fieldBlock = (
        <input
          className="forminputs"
          type="number"
          id={name}
          name={name}
          {...(register ? register(name!) : null)}
        />
      );
      break;
    case "date":
      fieldBlock = (
        <input
          className="forminputs"
          type="date"
          id={name}
          name={name}
          max={max}
          {...(register ? register(name!) : null)}
        />
      );
      break;
    case "email":
      fieldBlock = (
        <input
          className="forminputs"
          type="email"
          id={name}
          name={name}
          {...(register ? register(name!) : null)}
        />
      );
      break;
    case "textarea":
      fieldBlock = (
        <textarea
          className="forminputs"
          id={name}
          name={name}
          {...(register ? register(name!) : null)}
        />
      );
      break;
    case "file":
      switch (otherType) {
        case "image":
          fieldBlock = (
            <>
              {formValues![name!] === "" ? (
                <input
                  className="forminputs"
                  type="file"
                  {...(register
                    ? register(name!, {
                        onChange: async (e): Promise<void> => {
                          let file = await operations!.getFile(
                            e.target.files[0]
                          );

                          operations!.setValues({
                            ...formValues,
                            receipt: file,
                          });
                        },
                      })
                    : null)}
                />
              ) : (
                <>
                  <div
                    className="cross"
                    onClick={() => operations!.removeFile()}
                  >
                    X
                  </div>
                  <img
                    width={80}
                    height={60}
                    src={`${formValues![name!]}`}
                    alt="alt"
                  />
                </>
              )}
            </>
          );
          break;

        default:
          fieldBlock = (
            <>
              <input
                className="forminputs"
                type="file"
                {...(register
                  ? register(name!, {
                      onChange: async (e): Promise<void> => {
                        let file = await operations!.getFile(e.target.files[0]);

                        operations!.setValues({
                          ...formValues,
                          receipt: file,
                        });
                      },
                    })
                  : null)}
              />
            </>
          );
          break;
      }
      break;
    case "password":
      fieldBlock = (
        <input
          className="forminputs"
          type="password"
          id={name}
          name={name}
          {...(register ? register(name!) : null)}
        />
      );
      break;
    case "checkbox":
      fieldBlock = options?.map((item, index) => {
        return (
          <div key={item + index}>
            <input type="checkbox" id={name} name={name} value={item} />
            {item}
          </div>
        );
      });
      break;
    case "radio":
      fieldBlock = options?.map((item, index) => {
        return (
          <div key={item + index}>
            <input type="radio" id={name} name={name} value={item} />
            {item}
          </div>
        );
      });
      break;
    default:
      fieldBlock = (
        <input
          className="forminputs"
          type="text"
          id={name}
          name={name}
          {...(register ? register(name!) : null)}
        />
      );
      break;
  }
  return (
    <label htmlFor={name}>
      {label}
      {fieldBlock}
    </label>
  );
};
