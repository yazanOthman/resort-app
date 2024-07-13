import React, { useContext } from "react";
import Loading from "./Loading";
import RoomCard from "./RoomCard";
import Title from "./Title";
import { ResortContext } from "../components/ResortContext";

const FeaturedRooms = () => {
  const { loading, featuredRooms } = useContext(ResortContext);
  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? (
          <Loading />
        ) : (
          featuredRooms?.map((room) => (
            <div key={room.id}>
              <RoomCard room={room} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
