import { Link, useParams } from "react-router-dom";
import { BtnBlue, Loading } from "../components";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import { GridContainer } from "../components";
import { usePhotoStore } from "../stores/usePhotoStore";
import { useAuthStore } from "../stores/useAuthStore";
import BtnRed from "../components/BtnRed";

const Profile = () => {
  const { username } = useParams();
  const { authUser } = useAuthStore();
  const { user, getUser, deleteUser } = useUserStore();
  const { resetPhotos, photos, getPhotosByUser, loading } = usePhotoStore();

  useEffect(() => {
    getUser(username);
  }, [getUser, username]);

  useEffect(() => {
    resetPhotos();
    getPhotosByUser(username);
  }, [getPhotosByUser, username, resetPhotos]);

  return (
    <div>
      <div className="flex gap-10 items-center justify-between w-full mx-auto bg-blue-300 p-10">
        <div>
          <img className="w-[100px] rounded-full" src={user?.avatar} alt="" />
        </div>
        <div>
          <h1>
            <span className="font-bold">Username: </span>
            {user?.username}
          </h1>
          <h1>
            <span className="font-bold">email: </span>
            {user?.email}
          </h1>
          {user?.isAdmin && (
            <h1>
              <span className="font-bold">status: </span>
              Admin
            </h1>
          )}
        </div>
        <div>
          {authUser?.username === username && (
            <Link to="/edit-profile">
              <BtnBlue>Edit Profile</BtnBlue>
            </Link>
          )}
          {authUser?.isAdmin && (
            <BtnRed onClick={() => deleteUser(username)}>Delete User</BtnRed>
          )}
        </div>
      </div>
      <h1 className="text-center text-3xl mt-2 underline">
        UploadedBy {username}
      </h1>
      <div>{loading ? <Loading /> : <GridContainer photos={photos} />}</div>
    </div>
  );
};

export default Profile;
