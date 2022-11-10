import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { registerAdmin } from "../store/actionCreator"; // ini yang diedit di actioncreator
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateProfileTeacher() {
  const navigate = useNavigate();
  const [createProfileForm, setCreateProfileForm] = useState({
    fullName: "",
    bio: "",
    image: "",
    averageRating: 0,
  });

  const dispatch = useDispatch();

  const submitCreateProfileTeacher = (e) => {
    e.preventDefault();
    console.log(createProfileForm);
    dispatch(registerAdmin(createProfileForm)).then(() => {
      navigate("/");
      Swal.fire("Success Register!", "", "success");
    });
  };

  return (
    <>
      <h2 style={{ paddingTop: "40px", paddingLeft: "50px" }}>
        Complete Your Profile..
      </h2>
      <br></br>
      <br></br>
      <div className="row" style={{ padding: "10px", height: "100%" }}>
        <div className="col" style={{ flex: 0.55, marginLeft: "15%" }}>
          <img
            style={{ maxHeight: "500px" }}
            src="https://www.freeiconspng.com/uploads/png-format-images-of-teacher-icons-21.png"
          />
        </div>
        <div className="col" style={{ flex: 1 }}>
          <Form
            style={{ width: "40%", margin: "auto" }}
            onSubmit={submitCreateProfileTeacher}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Url.."
                onChange={(e) => {
                  // console.log(e.target.value);
                  createProfileForm({
                    ...createProfileForm,
                    username: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="email"
                rows={3}
                placeholder="Enter Full Name.."
                onChange={(e) => {
                  // console.log(e.target.value);
                  createProfileForm({
                    ...createProfileForm,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMainImg">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter bio.."
                onChange={(e) => {
                  // console.log(e.target.value);
                  createProfileForm({
                    ...createProfileForm,
                    password: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CreateProfileTeacher;
