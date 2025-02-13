import { Link, useNavigate, useParams } from "react-router-dom";
import { usePhotoStore } from "../stores/usePhotoStore";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import BtnRed from "../components/BtnRed";

const SinglePhoto = () => {
  const { id } = useParams();
  const { loading, singlePhoto, getSinglePhoto, deletePhoto } = usePhotoStore();
  const { title, description, image, createdAt, user } = singlePhoto;
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    getSinglePhoto(id);
  }, [getSinglePhoto, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative flex justify-center items-center">
        <img
          className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl max-h-screen"
          src={image}
          alt=""
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center pt-2 gap-2">
          <Link to={`/${user?.username}`}>
            <img
              className="h-[150px] rounded-full"
              src={user?.avatar}
              alt={user?.username}
            />
          </Link>
          <p className="text-gray-500">
            <span className="font-bold">UploadedBy: </span>
            {user?.username}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center min-h-[400px] ">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">
            <span className="font-bold">description: </span>
            {description}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Upload Date: </span>
            {formattedDate}
          </p>
          {(authUser?._id.toString() === user?._id.toString() || authUser?.isAdmin) && (
            <BtnRed
              onClick={() => {
                deletePhoto(id);
                navigate("/");
              }}
            >
              Delete
            </BtnRed>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePhoto;
