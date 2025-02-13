import { Link } from "react-router-dom";

const PhotoCard = ({ image, title, user, _id }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl mt-4 p-4 relative group">
      <Link to={`/photos/${_id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-lg hover:opacity-90 transition-opacity duration-300 hover:cursor-zoom-in"
        />
      </Link>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-3">
          <Link to={`/${user?.username}`}>
            <img
              src={user?.avatar}
              alt={user?.username}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          </Link>
          <p className="text-white font-bold">
            uploadedBy:
            <span className="text-white font-semibold ml-2">
              {user?.username}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
