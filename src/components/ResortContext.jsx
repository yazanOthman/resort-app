import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import client from "../Contentful";

export const ResortContext = createContext();
const ResortProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  const formateData = useCallback((items) => {
    const tempItems = items.map((item) => {
      const id = item.sys.id;
      const images = item.fields.images.map((img) => img.fields.file.url);
      const room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }, []);

  const getFeaturedRooms = useCallback((rooms) => {
    if (rooms.length) {
      const featuredRooms = rooms.filter((room) => room.featured);
      return featuredRooms;
    }
    return [];
  }, []);

  const getData = useCallback(async () => {
    try {
      const res = await client.getEntries({
        content_type: "resortRoom",
        order: "fields.capacity",
      });
      const rooms = formateData(res.items);
      setRooms(rooms);
      setFeaturedRooms(getFeaturedRooms(rooms));
      setSortedRooms(rooms);
      setLoading(false);
      const maxPrice = Math.max(...rooms?.map((item) => item.price));
      const maxSize = Math.max(...rooms?.map((item) => item.size));
      setFilterOptions((filterOptions) => ({
        ...filterOptions,
        maxPrice,
        maxSize,
        price: maxPrice,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [formateData, getFeaturedRooms]);

  useEffect(() => {
    getData();
  }, [getData]);

  const getRoom = useCallback(
    (slug) => {
      const tempRooms = [...rooms];
      const singleRoom = tempRooms.find((list) => list.slug === slug);
      return singleRoom;
    },
    [rooms]
  );

  const getFilteredRooms = useCallback(() => {
    let { type, breakfast, capacity, minSize, maxSize, pets, price } =
      filterOptions;

    // all the rooms
    let tempRooms = [...rooms];
    //t ransform values
    capacity = Number(capacity);
    price = Number(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((list) => list.type === type);
    }
    // filter by capacity
    if (capacity > 1) {
      tempRooms = tempRooms.filter((list) => list.capacity === capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter((list) => list.price <= price);
    // filter by size
    tempRooms = tempRooms.filter(
      (list) => list.size >= minSize && list.size <= maxSize
    );
    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((list) => list.breakfast);
    }
    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((list) => list.pets);
    }

    setSortedRooms(tempRooms);
  }, [filterOptions, rooms]);

  useEffect(() => {
    getFilteredRooms();
  }, [filterOptions, getFilteredRooms]);

  const handleChange = useCallback((event) => {
    const { name, type, checked } = event.target;
    const value = type === "checkbox" ? checked : event.target.value;

    console.log(value);

    setFilterOptions((filterOptions) => ({ ...filterOptions, [name]: value }));
  }, []);

  const contextValue = useMemo(
    () => ({
      rooms,
      featuredRooms,
      sortedRooms,
      loading,
      getRoom,
      filterOptions,
      handleChange,
    }),
    [
      rooms,
      featuredRooms,
      sortedRooms,
      loading,
      getRoom,
      filterOptions,
      handleChange,
    ]
  );

  return (
    <ResortContext.Provider value={contextValue}>
      {children}
    </ResortContext.Provider>
  );
};

export default ResortProvider;
