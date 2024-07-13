import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { data as items } from "../data";

export const ResortContext = createContext();
const ResortProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const formateData = useCallback((items) => {
    const tempItems = items.map((item) => {
      const id = item.sys.id;
      const images = item.fields.images.map((img) => img.fields.file.url);
      const room = { ...item.fields, images, id };
      return room;
    });
    setRooms(tempItems);
  }, []);

  const getSortedrooms = useCallback((rooms) => {
    if (rooms.length) {
      const featuredRooms = rooms.filter((room) => room.featured);
      return featuredRooms;
    }
    return [];
  }, []);

  const getRoom = useCallback(
    (slug) => {
      const tempRooms = [...rooms];
      const singleRoom = tempRooms.find((list) => list.slug === slug);
      return singleRoom;
    },
    [rooms]
  );

  useEffect(() => {
    formateData(items);
  }, [formateData]);

  useEffect(() => {
    setFeaturedRooms(getSortedrooms(rooms));
    setSortedRooms(rooms);
    setLoading(false);
  }, [rooms, getSortedrooms]);

  const contextValue = useMemo(
    () => ({
      rooms,
      featuredRooms,
      sortedRooms,
      loading,
      getRoom,
    }),
    [rooms, featuredRooms, sortedRooms, loading, getRoom]
  );

  return (
    <ResortContext.Provider value={contextValue}>
      {children}
    </ResortContext.Provider>
  );
};

export default ResortProvider;
