import * as yup from "yup";
import { fixedLengthValue, isValidFileType, mb1 } from "../utils/constants";

type typeTransactionValidationSchema = {
  notes: string;
  tdate: string;
  receipt: any;
  amount: number;
  FromAc: string;
  ToAc: string;
  ttype: string;
  monthyear: string;
};

export const transactionValidationSchema: yup.ObjectSchema<typeTransactionValidationSchema> =
  yup.object().shape({
    notes: yup
      .string()
      .trim()
      .required(`**Notes can't be empty..!`)
      .max(fixedLengthValue),
    tdate: yup.string().required(`**Date can't be empty..!`),
    receipt: yup
      .mixed()
      .required("**Receipt can't be empty..!")
      .test({
        name: "isValidReceipt",
        skipAbsent: true,
        test(value: yup.AnyObject, cto: yup.TestContext<yup.AnyObject>) {
          if (value === null || value === undefined) {
            return cto.createError({
              message: "**Receipt can't be empty..!",
            });
          } else {
            if (value[0] === undefined) {
              return cto.createError({
                message: "**Receipt can't be empty..!",
              });
            }
            if (value[0].name !== undefined) {
              if (!isValidFileType(value[0].name)) {
                return cto.createError({
                  message: "**Receipt format is not valid..!",
                });
              }
              if (!(value[0].size <= mb1)) {
                return cto.createError({
                  message: "**Receipt size exceeds..!",
                });
              }
            }
          }
          return true;
        },
      }),
    amount: yup
      .number()
      .required("**Amount can't be empty..!")
      .typeError("**Amount can't be empty..!")
      .min(1, "**Amount should be greater than 0"),
    FromAc: yup
      .string()
      .required(`**From A/c can't be empty..!`)
      .test({
        name: "FromAc",
        skipAbsent: true,
        test(value: string, ctx: yup.TestContext<yup.AnyObject>) {
          if (value === "") {
            return ctx.createError({
              message: `**From A/c can't be empty..!`,
            });
          }
          if (value === this.parent.ToAc) {
            return ctx.createError({
              message: `**From A/c and To A/c are same..!`,
            });
          }
          return true;
        },
      }),
    ToAc: yup
      .string()
      .required(`**To A/c can't be empty..!`)
      .test({
        name: "ToAc",
        skipAbsent: true,
        test(value: string, ctx: yup.TestContext<yup.AnyObject>) {
          if (value === "") {
            return ctx.createError({
              message: `**To A/c can't be empty..!`,
            });
          }
          if (value === this.parent.FromAc) {
            return ctx.createError({
              message: `**To A/c and From A/c are same..!`,
            });
          }
          return true;
        },
      }),
    ttype: yup.string().required(`**Transaction type can't be empty..!`),
    monthyear: yup.string().required(`**Month year can't be empty..!`),
  });
