import React from "react";
import RoomCard from "./RoomCard";

const RoomsList = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    );
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map((item) => (
          <div key={item.id}>
            <RoomCard room={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomsList;
