import React from "react";
import defaultImage from "../images/room-1.jpeg";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const { name, slug, images, price } = room;
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImage} alt="single room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link className="btn-primary room-link" to={`/rooms/${slug}`}>
          Features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
};

export default RoomCard;
