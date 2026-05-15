import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import { buttonClasses } from "./utils/htmlClasses";

export default function App() {
  const [users, setUsers] = useState([]);

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
    </div>
  );
}
