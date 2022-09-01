import { useContext, useState, useEffect } from "react";
import GeneralContext from "../contexts/CreateContext";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { userName } = useContext(GeneralContext);
  const [displayname, setDisplayName] = useState("");

  useEffect(() => {
    if (user && !userName) {
      setDisplayName(user.user);
    } else if (user && userName) {
      setDisplayName(userName);
    } else {
      setDisplayName("");
    }
  }, [user, userName]);

  return (
    <div className="boop text-center">
      <h2>
        Welcome {user ? <span>{displayname}</span> : ""} to{" "}
        <span className="agency-color">Adopt a Friend!</span>
      </h2>
      <h3>
        Our <span className="dog-color">Dogs</span> and{" "}
        <span className="cat-color">Cats</span> are waiting for you!
      </h3>
      <p className="p">
        Dreaming of adopting a Dog or a Cat? <br /> You came to the right place!{" "}
        <br />
        Use our adoption system and find the perfect pet that suits you.
      </p>
    </div>
  );
}
