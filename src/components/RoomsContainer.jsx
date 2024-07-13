import React, { useContext } from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { ResortContext } from "../components/ResortContext";

export default function RoomsContainer() {
  const { rooms, sortedRooms, loading } = useContext(ResortContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      RoomsContainer
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </div>
  );
}
