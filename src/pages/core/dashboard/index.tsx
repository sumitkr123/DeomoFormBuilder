import React, { useMemo, useRef, useState } from "react";
import "../../../assets/styles/dashboard.css";
import { FormField } from "../../../components/FormFields/FormField";
import { Link } from "react-router-dom";

export const DashBoard = (): React.JSX.Element => {
  const [allForms, setAllForms] = useState<{
    [key: string]: Array<JSX.Element>;
  }>({});

  const [viewForm, setViewForm] = useState<Array<JSX.Element>>([]);

  const dialogref = useRef<any>("");

  useMemo(() => {
    let allFormFromDB = JSON.parse(localStorage.getItem("allForms")!);

    let newForms: any = {};

    Object.entries(allFormFromDB).map((item) => {
      newForms[item[0]] = item[1];
    });

    setAllForms(newForms);
  }, []);

  const showForm = (form: any) => {
    setViewForm(form);
    dialogref.current.style.display = "flex";
  };

  const closeForm = () => {
    dialogref.current.style.display = "none";
  };

  return (
    <div className="container">
      <div className="homedata">
        <div className="form1div">
          <h1 className="form1">Forms</h1>
        </div>
        <div className="hometable">
          <div className="headerrow">
            <div className="hrow">
              <div className="headtabcolumn">Form names</div>
              <div className="headtabcolumn">Action</div>
            </div>
          </div>

          <div className="datarow">
            {Object.keys(allForms).map((key) => {
              return (
                <div className="drow">
                  <div className="tabcolumn">{key}</div>
                  <div className="tabcolumn">
                    <div className="viewForm">
                      <div
                        className="view"
                        onClick={() => showForm(allForms[key])}
                      >
                        VIEW
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div id="myModal1" ref={dialogref} className="modal">
        <div className="modal-card">
          <div className="modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  closeForm();
                }}
              >
                X
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={() => {}} className="form">
                {Object.values(viewForm).map((form: any, index) => {
                  return (
                    <FormField key={index + form.props.name} {...form.props} />
                  );
                })}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="navSection">
        <Link to={"create"}>Create new form</Link>
      </div>
    </div>
  );
};
