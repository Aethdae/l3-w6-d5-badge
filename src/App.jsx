import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import { buttonClasses } from "./utils/htmlClasses";

export default function App() {
  const [users, setUsers] = useState([]);

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  async function getAllUsers() {
    try {
      const { data, error } = await supabase.from("users").select().order("id");
      if (error) {
        throw new Error(error.message);
      }
      setUsers(data);
      console.log(data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  async function addUser(user) {
    await supabase.from("users").insert(user);
    getAllUsers();
  }

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>
              Name: {user.first_name} {user.last_name}
            </p>
            <button className={buttonClasses.join(" ")}>Delete</button>
            <button className={buttonClasses.join(" ")}>Edit</button>
          </div>
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser({ first_name, last_name, email, role });
        }}
      >
        <label>
          f name
          <input
            value={first_name}
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
            type="text"
            name="first_name"
            id="first_name"
          />
        </label>
        <label>
          l name
          <input
            value={last_name}
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
            type="text"
            name="last_name"
            id="last_name"
          />
        </label>
        <label>
          email
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            id="email"
          />
        </label>
        <label>
          role
          <input
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            type="text"
            name="role"
            id="role"
          />
        </label>
        <button>submit</button>
      </form>
    </div>
  );
}
