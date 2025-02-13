import PhotoCard from "./PhotoCard";

const GridContainer = ({ photos }) => {
  return (
    <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white">
      {photos.map((photo) => (
        <PhotoCard key={photo._id} {...photo} />
      ))}
    </div>
  );
};

export default GridContainer;
