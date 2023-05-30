import { useEffect, useRef, useState } from "react";
import "../../../assets/styles/form.css";
import { FormField } from "../../../components/FormFields/FormField";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Components: { [key: string]: any } = {
  input: {
    name: "Input",
    element: <FormField mainType="input" />,
  },
  select: {
    name: "Select",
    element: <FormField mainType="select" type="select" />,
  },
};

type FormPropsType = {
  [key: string]: any;
  input: {
    name: {
      name: string;
      type: string;
    };
    type: {
      name: string;
      type: string;
      options: string[];
    };
    label: {
      name: string;
      type: string;
    };
  };
  select: {
    name: {
      name: string;
      type: string;
    };
    label: {
      name: string;
      type: string;
    };
    options: {
      name: string;
      type: string;
    };
  };
};

const FormProps: FormPropsType = {
  input: {
    name: {
      name: "Name",
      type: "text",
    },
    type: {
      name: "Type",
      type: "select",
      options: ["text", "file", "password", "number", "date"],
    },
    label: {
      name: "Label",
      type: "text",
    },
  },
  select: {
    name: {
      name: "Name",
      type: "text",
    },
    label: {
      name: "Label",
      type: "text",
    },
    options: {
      name: "Enter options :- (Comma separated)",
      type: "text",
    },
  },
};

export const CreateForm = (): React.JSX.Element => {
  const [AllSelected, setAllSelected] = useState<Array<React.JSX.Element>>([]);

  const [choosedComponent, setChoosed] = useState<React.JSX.Element>(<></>);

  const [dropped, setDropped] = useState(false);

  const [toggleForm, setToggleForm] = useState(false);

  const [submit, setSubmit] = useState(false);

  const dialogref = useRef<any>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (dropped) {
      setToggleForm(true);
    }
  }, [dropped]);

  useEffect(() => {
    if (submit && Object.keys(choosedComponent).length !== 0) {
      let newAllSelected = [...AllSelected];

      newAllSelected.push(choosedComponent);
      setAllSelected(newAllSelected);
      setChoosed(<></>);
      setSubmit(false);
      setToggleForm(false);
      setDropped(false);
    }
  }, [submit]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "all",
  });

  const onSubmit = (data: any) => {
    setSubmit(true);

    let newchoosed = { ...choosedComponent.props };

    Object.keys(data).map((key) => {
      if (key === "options") {
        let allOptions = data[key].split(",");
        newchoosed[key] = allOptions;
      } else if (
        key === "type" &&
        choosedComponent.props.mainType === "select"
      ) {
        newchoosed.type = "select";
      } else {
        newchoosed[key] = data[key];
      }
    });

    setChoosed({ ...choosedComponent, props: newchoosed });
  };

  const saveYourForm = () => {
    let newdate = new Date();

    let allFormFromDB = JSON.parse(localStorage.getItem("allForms")!);

    if (allFormFromDB) {
      let newDate11 = newdate.toISOString();

      allFormFromDB[newDate11] = AllSelected;

      localStorage.setItem("allForms", JSON.stringify(allFormFromDB));
    } else {
      let firstDate = newdate.toISOString();
      localStorage.setItem(
        "allForms",
        JSON.stringify({ [firstDate]: AllSelected })
      );
    }
    navigate("/");
  };

  return (
    <div className="container">
      <div className="dragdropformdiv">
        <div className="choosingComponentDiv">
          <div className="navDiv">
            <nav className="navBar">
              <label>
                Choose component..! :-
                <ul className="navUl">
                  {Object.keys(Components).map((key) => {
                    return (
                      <li
                        key={key}
                        draggable="true"
                        onDrag={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setChoosed(Components[key].element);
                        }}
                      >
                        {Components[key].name}
                      </li>
                    );
                  })}
                </ul>
              </label>
            </nav>
          </div>
        </div>
        <div
          className="draggedHere"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            setDropped(true);
          }}
        >
          <h1>Drag your component here</h1>
          {AllSelected.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
          {AllSelected.length !== 0 && (
            <input
              type="button"
              name="button"
              value={"Save your Form"}
              onClick={() => saveYourForm()}
            />
          )}
        </div>
        {toggleForm && (
          <div id="myModal" ref={dialogref} className="modal">
            <div className="modal-card">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Modal Header</h2>
                  <span
                    className="close"
                    onClick={() => {
                      setDropped(false);
                      setToggleForm(false);
                    }}
                  >
                    X
                  </span>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {Object.keys(
                      FormProps[choosedComponent.props.mainType]
                    ).map((newkey) => {
                      return choosedComponent.props.mainType === "select" ? (
                        <FormField
                          key={
                            newkey +
                            FormProps[choosedComponent.props.mainType][newkey]
                              .type +
                            FormProps[choosedComponent.props.mainType][newkey]
                              .name +
                            FormProps[choosedComponent.props.mainType][newkey]
                          }
                          name={newkey}
                          type={
                            FormProps[choosedComponent.props.mainType][newkey]
                              .type
                          }
                          label={
                            FormProps[choosedComponent.props.mainType][newkey]
                              .name
                          }
                          error={errors[newkey]?.message as string}
                          register={register}
                        />
                      ) : (
                        <FormField
                          key={
                            newkey +
                            FormProps[choosedComponent.props.mainType][newkey]
                              .type +
                            FormProps[choosedComponent.props.mainType][newkey]
                              .name +
                            FormProps[choosedComponent.props.mainType][newkey]
                          }
                          name={newkey}
                          type={
                            FormProps[choosedComponent.props.mainType][newkey]
                              .type
                          }
                          options={
                            FormProps[choosedComponent.props.mainType][newkey]
                              .options
                          }
                          label={
                            FormProps[choosedComponent.props.mainType][newkey]
                              .name
                          }
                          error={errors[newkey]?.message as string}
                          register={register}
                        />
                      );
                    })}
                    <input type="submit" value={"Save"} />
                  </form>
                </div>
                <div className="modal-footer">
                  <h3>Modal Footer</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="navSection">
        <Link to={"/"}>Go to Home</Link>
      </div>
    </div>
  );
};
