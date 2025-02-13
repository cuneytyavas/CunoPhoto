import { Link, useLocation } from "react-router-dom";
import bgVideo from "../assets/bgvideo.mp4";
import { FaPlus } from "react-icons/fa";
import { GridContainer, Loading } from "../components";
import { useAuthStore } from "../stores/useAuthStore";
import { usePhotoStore } from "../stores/usePhotoStore";
import { useEffect } from "react";

const Home = () => {
  const { authUser } = useAuthStore();
  const { photos, getPhotos, resetPhotos, loading } = usePhotoStore();
  const location = useLocation();

  useEffect(() => {
    const fetchPhotos = async () => {
      resetPhotos();
      getPhotos();
    };
    fetchPhotos();
  }, [getPhotos, resetPhotos, location.pathname]);

  return (
    <div className="h-screen relative">
      <div className="h-[700px] relative">
        <video
          autoPlay
          loop
          muted
          className="fixed right-0 top-0 h-[700px] w-full object-cover z-[-1] blur-sm"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className=" bg-black/20 h-full ">
          <div className="h-full flex justify-center items-center p-4">
            <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-white space-y-4 lg:pr-36">
                <h1 className="text-5xl font-bold">
                  Immortalize Your Memories
                </h1>
                <p>
                  Photography is a way of feeling, of touching, of loving. What
                  you have caught on film is captured forever… It remembers
                  little things, long after you have forgotten everything
                  Immortalize Your Memories.
                </p>
                {!authUser && (
                  <button className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-1 rounded-md duration-200">
                    <Link to="/register">JOIN US</Link>
                  </button>
                )}
              </div>
              <div></div>
            </div>
          </div>

          {/* Gradient Layer */}
          <div className="absolute bottom-0 z-9 right-0 w-full bg-gradient-to-b from-black/10 to-black/90 h-[10px] sm:h-[15px] md:[20px]"></div>
        </div>
      </div>
      <div>{loading ? <Loading /> : <GridContainer photos={photos} />}</div>
      <Link to="/create-photo">
        {authUser ? (
          <button className="group fixed bottom-10 right-10 p-2 cursor-pointer flex items-center justify-center bg-yellow-400 rounded-full w-12 h-12 hover:w-auto hover:bg-yellow-500 ">
            <FaPlus className="text-white size-10 group-hover:hidden" />
            <span className="hidden group-hover:inline text-white font-semibold px-2">
              Add Photo
            </span>
          </button>
        ) : (
          <button className="group fixed bottom-10 right-10 p-2 cursor-pointer flex items-center justify-center bg-yellow-400 rounded-full w-12 h-12 hover:w-auto hover:bg-yellow-500 ">
            <FaPlus className="text-white size-10 group-hover:hidden" />
            <span className="hidden group-hover:inline text-white font-semibold px-2">
              Please Register To Add Photo
            </span>
          </button>
        )}
      </Link>
    </div>
  );
};

export default Home;
