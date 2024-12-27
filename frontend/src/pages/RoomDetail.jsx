import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roomService from "../services/RoomService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoom } from "../redux/reducers/RoomReducer";
import { Car, Dumbbell, Tv, Wifi, Wind } from "lucide-react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import bookingService from "../services/BookingService";
import { setTotalPrice } from "../redux/reducers/BookingReducer";

const RoomDetail = () => {
  const [availableForm, setAvailableForm] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [days, setDays] = useState(0);
  const [tax, setTax] = useState(400);
  const [guests, setGuests] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBook, setShowBook] = useState(false);

  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate()

  let { currentRoom } = useSelector((state) => state.room);
  let { user } = useSelector((state) => state.user);
  console.log(user)
  let { totalprice } = useSelector((state) => state.booking);

  let query3 = useQuery({
    queryKey: ["oneRoom"],
    queryFn: async function () {
      try {
        let room = await roomService.getOneRoom(id);
        return dispatch(setCurrentRoom(room.data));
      } catch (error) {
        console.log(error.message);
      }
    },
  });

 
  useEffect(() => {
    const { checkIn, checkOut } = availableForm;
    if (checkIn && checkOut) {
      let timeDiff = new Date(checkOut) - new Date(checkIn);
      let calculatedDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDays(calculatedDays > 0 ? calculatedDays : 0);
    } else {
      setDays(0);
    }
  }, [availableForm]);


  function handleAvailabilityChange(field, date) {
    setAvailableForm((prev) => ({
      ...prev,
      [field]: date,
    }));
  }

  
  async function handleCheckAvailability(e) {
    e.preventDefault();
    const formData = { ...availableForm, guests };
    console.log("Form Data:", formData);
    try {
      let checked = await roomService.checkAvailableRoom(id, formData);
      let { available } = checked.data;
      if (available) {
        toast.success("This Room is Available");
        setIsDisabled(false);

      
        let calculatedPrice = currentRoom?.pricePerNight * days + tax;
        dispatch(setTotalPrice(calculatedPrice));
      } else {
        toast.error("This Room is not Available");
        setIsDisabled(true);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  
  async function handleCreateBooking() {
    try {
      await bookingService.createBooking(id, {
        user: user?._id,
        checkInDate: availableForm.checkIn,
        checkOutDate: availableForm.checkOut,
        numberOfGuests: guests,
        totalPrice: totalprice,
      });
      toast.success("Booking created successfully!");
      navigate("/payment-options")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white p-10">
      {showBook === true ? (
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            Are You Sure About Booking This Room
          </h1>
          <button
            onClick={handleCreateBooking}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className="relative">
          <div>
            <div className="w-full flex justify-between">
              <h1 className="text-4xl font-bold">{currentRoom?.roomName}</h1>
              <div className="flex flex-col items-center w-fit">
                <span className="text-3xl font-bold">
                  &#8377; {currentRoom?.pricePerNight}
                </span>
                <span className="text-lg text-gray-500">per night</span>
              </div>
            </div>
            <div className="w-[1000px] h-[380px] overflow-hidden rounded-xl">
              <img
                className="w-full h-full object-cover object-center"
                src={currentRoom?.image}
                alt=""
              />
            </div>
            <div className="mt-4 w-[1000px] h-fit p-3 bg-[#1F2937] rounded-lg">
              <h1 className="text-lg font-semibold">Room Details</h1>
              <p className="text-gray-400">{currentRoom?.description}</p>
            </div>
            <div className="mt-4 w-[1000px] h-fit p-3 bg-[#1F2937] rounded-lg">
              <h1 className="text-lg font-semibold">Facilities</h1>
              {currentRoom?.facilities?.map((item, index) => (
                <div className="mt-4 flex gap-5 flex-wrap" key={index}>
                  {item === "Wifi" && (
                    <span className="flex items-center gap-2 text-lg">
                      <Wifi className="h-5 w-5 text-indigo-500" />
                      {item}
                    </span>
                  )}
                  {item === "Tv" && (
                    <span className="flex items-center gap-2 text-lg">
                      <Tv className="h-5 w-5 text-indigo-500" />
                      {item}
                    </span>
                  )}
                  {item === "AC" && (
                    <span className="flex items-center gap-2 text-lg">
                      <Wind className="h-5 w-5 text-indigo-500" />
                      {item}
                    </span>
                  )}
                  {item === "Car" && (
                    <span className="flex items-center gap-2 text-lg">
                      <Car className="h-5 w-5 text-indigo-500" />
                      {item}
                    </span>
                  )}
                  {item === "Gym" && (
                    <span className="flex items-center gap-2 text-lg">
                      <Dumbbell className="h-5 w-5 text-indigo-500" />
                      {item}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 w-[1000px] h-fit p-3 bg-[#1F2937] rounded-lg">
              <h1 className="text-lg font-semibold">
                Check Availability for the Room
              </h1>
              <form
                onSubmit={handleCheckAvailability}
                className="mt-3 flex flex-col gap-4 relative"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="checkIn">Check In Date</label>
                    <DatePicker
                      selected={availableForm.checkIn}
                      className="bg-gray-800 border outline-none px-4 py-2 rounded-sm border-gray-700"
                      placeholderText="yyyy-mm-dd"
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) =>
                        handleAvailabilityChange("checkIn", date)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="checkOut">Check Out Date</label>
                    <DatePicker
                      selected={availableForm.checkOut}
                      className="bg-gray-800 border outline-none px-4 py-2 rounded-sm border-gray-700"
                      placeholderText="yyyy-mm-dd"
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) =>
                        handleAvailabilityChange("checkOut", date)
                      }
                    />
                  </div>
                  <input
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    name="guests"
                    placeholder="Enter Number of Guests"
                    type="number"
                    className="w-[200px] h-fit mt-9 outline-none px-3 py-2 bg-gray-600"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="w-[150px] h-fit px-3 py-2 bg-blue-600 text-sm rounded-lg"
                  >
                    Check Availability
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <span>Days: {days}</span>
              <span>Tax: &#8377; {tax}</span>
              <span>Total Price: &#8377; {totalprice}</span>
              <button
                disabled={isDisabled}
                className={`${
                  isDisabled ? "bg-gray-600" : "bg-blue-600"
                } px-4 py-2 rounded-lg`}
                onClick={() => setShowBook(true)}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetail;
