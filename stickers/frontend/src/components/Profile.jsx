import { useRouteLoaderData } from "react-router-dom";

export default function Profile() {
  let user = useRouteLoaderData("user-cookie");

  return (
    <div className="card">
      <img src={user.img} alt="profile pic" className="profilePic" />
      <div className="profile-details">
        <h2>{user.name}</h2>
        <h2>Stickers owned : {user.wealth}</h2>
        <div className="mail">
          <img src="/imgs/mail.png" alt="mail" />
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
