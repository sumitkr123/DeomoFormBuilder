import { useEffect, useRef, useState } from "react";
import "../../../assets/styles/form.css";
import { FormField } from "../../../components/FormFields/FormField";

const Components: { [key: string]: any } = {
  input: "Input",
  select: "Select Box",
};

const FormProps: { [key: string]: any } = {
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
};

export const CreateForm = (): React.JSX.Element => {
  const [choosedComponent, setChoosedComponent] = useState(<></>);

  const [selected, setSelected] = useState<Array<JSX.Element>>([]);

  const showComponent = (inputType: string) => {
    let newComponent = <FormField type={inputType} />;

    setChoosedComponent(newComponent);
  };

  const [toggleForm, setToggleForm] = useState(false);

  const dialogref = useRef<any>("");

  useEffect(() => {
    if (selected.length !== 0) {
      setToggleForm((old) => !old);
    }
  }, [selected]);

  useEffect(() => {
    if (toggleForm) {
      dialogref.current.style.display = "flex";
    }
  }, [toggleForm]);

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
                      <li key={key} onClick={() => showComponent(key)}>
                        {Components[key]}
                      </li>
                    );
                  })}
                </ul>
              </label>
            </nav>
          </div>
          <div className="showingComponentDiv">
            <div
              className="choosedComponent"
              draggable="true"
              onDrag={(e) => e.preventDefault()}
            >
              {choosedComponent}
            </div>
          </div>
        </div>
        <div
          className="draggedHere"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            setSelected((old) => [...old, choosedComponent]);
          }}
        >
          <h1>Drag your component here</h1>
          {selected}
        </div>
        {toggleForm && (
          <div id="myModal" ref={dialogref} className="modal">
            <div className="modal-card">
              <div className="modal-content">
                <div className="modal-header">
                  <span
                    className="close"
                    onClick={() => {
                      setToggleForm(false);
                    }}
                  >
                    &times;
                  </span>
                  <h2>Modal Header</h2>
                </div>
                <div className="modal-body">
                  <form>
                    {Object.keys(FormProps).map((key) => {
                      console.log(choosedComponent);
                      return choosedComponent.props.type === "select" &&
                        key !== "type" ? (
                        <FormField key={key} label={FormProps[key].name} />
                      ) : (
                        choosedComponent.props.type !== "select" && (
                          <FormField
                            key={key}
                            label={FormProps[key].name}
                            type={FormProps[key].type}
                            options={FormProps[key].options}
                          />
                        )
                      );
                    })}
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
    </div>
  );
};
