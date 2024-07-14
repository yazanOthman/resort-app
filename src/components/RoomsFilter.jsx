import React, { useContext } from "react";
import Title from "./Title";
import { ResortContext } from "./ResortContext";

const getUnique = (rooms, value) => {
  return [...new Set(rooms.map((room) => room[value]))];
};

const RoomsFilter = () => {
  const { handleChange, filterOptions, rooms } = useContext(ResortContext);
  const {
    type,
    breakfast,
    capacity,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    pets,
    price,
  } = filterOptions;
  console.log(breakfast);
  let roomTypes = getUnique(rooms, "type");
  roomTypes = ["all", ...roomTypes];
  const roomCapacity = getUnique(rooms, "capacity");
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            value={type}
            onChange={(e) => handleChange(e)}
            id="type"
            className="form-control"
          >
            {roomTypes.map((roomType, index) => (
              <option key={index} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="capacity">guests</label>
          <select
            name="capacity"
            value={capacity}
            onChange={(e) => handleChange(e)}
            id="capacity"
            className="form-control"
          >
            {roomCapacity.map((capacity, index) => (
              <option key={index} value={capacity}>
                {capacity}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            name="price"
            id="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={(e) => handleChange(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={(e) => handleChange(e)}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={(e) => handleChange(e)}
              className="size-input"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RoomsFilter;
