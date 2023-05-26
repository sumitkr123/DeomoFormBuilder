import monthYears, {
  accountTypes,
  today,
  transactionTypes,
} from "../utils/constants";

export interface EditFormPayloadType {
  edit: Form;
  id: number;
}

export interface Form {
  [key: string]: any;
  id: number;
  tdate: string;
  notes: string;
  amount: number | string;
  FromAc: string;
  ToAc: string;
  ttype: string;
  monthyear: string;
  receipt: string;
}

type typeFormHeaders = {
  [key: string]: {
    name: string;
    isSortable: boolean;
    sortType?: string;
    type?: string;
  };
};

export const FormTabHeaders: typeFormHeaders = {
  tdate: { name: "Transaction-Date", isSortable: true, sortType: "date" },
  monthyear: { name: "Month-year", isSortable: true, sortType: "monthyear" },
  ttype: { name: "Transaction-Type", isSortable: true },
  FromAc: { name: "From-A/c", isSortable: true },
  ToAc: { name: "To-A/c", isSortable: true },
  amount: {
    name: "Amount",
    isSortable: true,
    sortType: "number",
    type: "amount",
  },
  receipt: { name: "Receipt", isSortable: false, type: "image" },
  notes: { name: "Notes", isSortable: true },
};

type typeForm = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
    max?: string;
    otherType?: string;
    options?: string[];
  };
};

export const dynamicForm: typeForm = {
  tdate: {
    name: "tdate",
    label: "Transaction date",
    type: "date",
    max: today.toISOString().split("T")[0],
  },
  notes: {
    name: "notes",
    label: "Notes",
    type: "textarea",
  },
  amount: {
    name: "amount",
    label: "Amount",
    type: "number",
  },
  FromAc: {
    name: "FromAc",
    label: "From A/c",
    type: "select",
    options: accountTypes,
  },
  ToAc: {
    name: "ToAc",
    label: "To A/c",
    type: "select",
    options: accountTypes,
  },
  ttype: {
    name: "ttype",
    label: "Transaction type",
    type: "select",
    options: transactionTypes,
  },
  monthyear: {
    name: "monthyear",
    label: "Month year",
    type: "select",
    options: monthYears,
  },
  receipt: {
    name: "receipt",
    label: "Receipt",
    type: "file",
    otherType: "image",
  },
};

export const FormInitialValues = {
  notes: "",
  amount: "",
  FromAc: "",
  ToAc: "",
  ttype: "",
  monthyear: "",
  tdate: "",
  receipt: "",
  id: 0,
};
