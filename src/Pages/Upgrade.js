import React from "react";
import Navbar from "./Navbar";
import "../Assets/css/Upgrade.css";
import correct from "../Assets/img/correct.png";

function Upgrade() {
  return (
    <div className="upgrade">
      <Navbar title="Upgrade" />
      <section className="upgrade__section">
        <div className="container">
          <div className="row mt-5 mb-5">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="row yellow__row">
                    <div className="col-md-12 mt-4">
                      <h5 className="text-center text-light">STANDARD</h5>
                      <h1 className="text-center text-light">29€</h1>
                      <p className="text-center text-light mb-0">PER MONTH</p>
                      <p className="text-center text-light">PER USER</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 d-flex justify-content-start">
                      <p>FILE STORAGE</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>300GB</p>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <p>USER</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>UP TO 30</p>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <p>AGILE HINTS</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>UP TO 100</p>
                    </div>
                    <div className="col-7 d-flex justify-content-start">
                      <p>REFUND FOR FAILURE</p>
                    </div>
                    <div className="col-5  d-flex justify-content-end">
                      <p>100%</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Work Item Tracking
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Scrum & Kanban boards
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Apps and integretions
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Analytic Dashboard
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Customizable Workflow
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Backlog
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Messaging
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      End-user Review
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Project Roles
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Agile Reporting
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Gamification
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Business hours support
                    </div>
                  </div>
                  <div className="row mb-5 mt-5">
                    <div className="col-md-12 d-flex justify-content-center">
                      <button className="btn btn__book">BOOK</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="row blue__row">
                    <div className="col-md-12 mt-4">
                      <h5 className="text-center text-light">STANDARD</h5>
                      <h1 className="text-center text-light">29€</h1>
                      <p className="text-center text-light mb-0">PER MONTH</p>
                      <p className="text-center text-light">PER USER</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 d-flex justify-content-start">
                      <p>FILE STORAGE</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>300GB</p>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <p>USER</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>UP TO 30</p>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <p>AGILE HINTS</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>UP TO 100</p>
                    </div>
                    <div className="col-7 d-flex justify-content-start">
                      <p>REFUND FOR FAILURE</p>
                    </div>
                    <div className="col-5  d-flex justify-content-end">
                      <p>100%</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Work Item Tracking
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Scrum & Kanban boards
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Apps and integretions
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Analytic Dashboard
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Customizable Workflow
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Backlog
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Messaging
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      End-user Review
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Project Roles
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Agile Reporting
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Gamification
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Business hours support
                    </div>
                  </div>
                  <div className="row mb-5 mt-5">
                    <div className="col-md-12 d-flex justify-content-center">
                      <button className="btn btn__book">BOOK</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="row dark__row">
                    <div className="col-md-12 mt-4">
                      <h5 className="text-center text-light">STANDARD</h5>
                      <h1 className="text-center text-light">29€</h1>
                      <p className="text-center text-light mb-0">PER MONTH</p>
                      <p className="text-center text-light">PER USER</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 d-flex justify-content-start">
                      <p>FILE STORAGE</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>300GB</p>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <p>USER</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>UP TO 30</p>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <p>AGILE HINTS</p>
                    </div>
                    <div className="col-6  d-flex justify-content-end">
                      <p>UP TO 100</p>
                    </div>
                    <div className="col-7 d-flex justify-content-start">
                      <p>REFUND FOR FAILURE</p>
                    </div>
                    <div className="col-5  d-flex justify-content-end">
                      <p>100%</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Work Item Tracking
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Scrum & Kanban boards
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Apps and integretions
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Analytic Dashboard
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Customizable Workflow
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Backlog
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Messaging
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      End-user Review
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Project Roles
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Agile Reporting
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Gamification
                    </div>
                    <div className="col-md-12 mt-3 d-flex align-items-center">
                      <img src={correct} alt="" className="img-fluid mr-2" />
                      Business hours support
                    </div>
                  </div>
                  <div className="row mb-5 mt-5">
                    <div className="col-md-12 d-flex justify-content-center">
                      <button className="btn btn__book">BOOK</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Upgrade;
