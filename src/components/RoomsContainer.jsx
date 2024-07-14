import React, { useContext } from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { ResortContext } from "../components/ResortContext";

export default function RoomsContainer() {
  const { sortedRooms, loading } = useContext(ResortContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <RoomsFilter />
      <RoomsList rooms={sortedRooms} />
    </div>
  );
}
