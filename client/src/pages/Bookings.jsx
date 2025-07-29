"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import api from "../utils/api";

const Bookings = () => {
  const { user } = useAuth();
  console.log(user);

  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");
  const [linkUpdated, setLinkUpdated] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [durationComplete, setDurationComplete] = useState(false);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);

  useEffect(() => {
    let interval;

    if (isMeetingStarted) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev >= 1800) {
            // 30 minutes
            clearInterval(interval);
            setDurationComplete(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isMeetingStarted]);

  const handleJoin = () => {
    setIsMeetingStarted(true);
    setElapsedTime(0);
    setDurationComplete(false); // reset if rejoining
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = activeTab === "all" ? "" : `?type=${activeTab}`;
      const response = await api.get(`/bookings/my-bookings${params}`);
      setBookings(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status, meetingLink = "") => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status, meetingLink });
      addToast(`Booking ${status} successfully!`, "success");
      fetchBookings();
    } catch (error) {
      addToast("Failed to update booking", "error");
    }
  };

  const updateLink = async (bookingId, link) => {
    try {
      await api.put(`/bookings/${bookingId}/link`, { link });
      addToast(`Link Updated successfully!`, "success");
      setLinkUpdated(true);
    } catch (error) {
      addToast("Failed to update Link", "error");
    }
  };

  const completeSession = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/complete`);
      addToast("Session completed successfully!", "success");
      fetchBookings();
    } catch (error) {
      addToast("Failed to complete session", "error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "teaching") return booking.teacher._id === user._id;
    if (activeTab === "learning") return booking.learner._id === user._id;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent mb-2">
            My Bookings
          </h1>
          <p className="text-zinc-700">
            Manage your teaching and learning sessions
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-zinc-200 p-2 mb-8 shadow-xl">
          <div className="flex space-x-2">
            {["all", "teaching", "learning"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base shadow-sm ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-fuchsia-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white/80 backdrop-blur-md rounded-3xl border border-zinc-200 p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                        {booking.teacher._id === user._id
                          ? booking.learner.name[0]
                          : booking.teacher.name[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-800">
                          {booking.skill}
                        </h3>
                        <p className="text-zinc-600">
                          {booking.teacher._id === user._id
                            ? "Teaching"
                            : "Learning from"}{" "}
                          {booking.teacher._id === user._id
                            ? booking.learner.name
                            : booking.teacher.name}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-zinc-500">Date:</span>
                        <p className="font-medium">
                          {new Date(booking.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-zinc-500">Time:</span>
                        <p className="font-medium">
                          {new Date(booking.scheduledDate).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-zinc-500">Duration:</span>
                        <p className="font-medium">
                          {booking.duration} minutes
                        </p>
                      </div>
                      <div>
                        <span className="text-zinc-500">Status:</span>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                        <p className="text-sm text-zinc-700">
                          {booking.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 lg:ml-6">
                    {booking.teacher._id === user._id &&
                      booking?.status == "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateBookingStatus(
                                booking._id,
                                "accepted",
                                "https://meet.google.com/new"
                              )
                            }
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateBookingStatus(booking._id, "rejected")
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    {/* <div>Hello!</div> */}
                    {booking.status === "accepted" && (
                      <>
                        {booking.meetingLink &&
                          (linkUpdated ? (
                            <></>
                          ) : (
                            <a
                              onClick={() => handleJoin()}
                              href={booking.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm text-center"
                            >
                              Join Meeting
                            </a>
                          ))}
                        {booking.teacher._id === user._id &&
                          (durationComplete ? (
                            <button
                              onClick={() => completeSession(booking._id)}
                              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm"
                            >
                              Mark Complete
                            </button>
                          ) : (
                            <div className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 text-center transition-colors text-sm">
                              Wait for atleast 30 mins to mark complete
                            </div>
                          ))}
                        {booking.teacher._id === user._id &&
                          (linkUpdated ? (
                            <div>
                              Link Updated! Go to Google Meet and Admit the
                              learner
                            </div>
                          ) : (
                            <>
                              <div>
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium text-zinc-700 mb-2"
                                >
                                  Enter Updated Link
                                </label>
                                <input
                                  id="link"
                                  name="link"
                                  type="text"
                                  required
                                  value={link}
                                  onChange={(e) => setLink(e.target.value)}
                                  className="w-full px-4 py-3 bg-white/50 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all duration-200"
                                  placeholder="Enter your full name"
                                />
                              </div>
                              <button
                                onClick={() => updateLink(booking._id, link)}
                                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm"
                              >
                                Update Link
                              </button>
                            </>
                          ))}
                      </>
                    )}

                    {booking.status === "completed" &&
                      booking.pointsEarned > 0 && (
                        <div className="text-center">
                          <span className="text-sm text-green-600 font-medium">
                            {booking.teacher._id === user._id
                              ? `${booking?.pointsEarned} points earned`
                              : ""}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}

            {filteredBookings.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-zinc-600">No bookings found</p>
                <p className="text-sm text-zinc-500 mt-1">
                  {activeTab === "teaching"
                    ? "No one has booked your skills yet"
                    : activeTab === "learning"
                    ? "You haven't booked any sessions yet"
                    : "No bookings available"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
