'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { 
  FiSearch, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiDollarSign, 
  FiCheck, 
  FiClock,
  FiLogOut,
  FiShield,
  FiUsers,
  FiCalendar
} from 'react-icons/fi';
import axios from 'axios';
import styles from './dashboard.module.css';

export default function AgentDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allPendingBookings, setAllPendingBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [agentUser, setAgentUser] = useState(null);
  const [confirmingBookings, setConfirmingBookings] = useState(new Set());
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is an agent
    const token = localStorage.getItem('agentToken');
    const user = localStorage.getItem('agentUser');
    
    if (!token || !user) {
      router.push('/agent/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      if (!parsedUser.is_agent) {
        toast.error('Access denied. Agent privileges required.');
        router.push('/agent/login');
        return;
      }
      setAgentUser(parsedUser);
      
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/agent/login');
    }
  }, [router]);


  const handleSearch = async (query = searchQuery) => {
    // Validate search term
    if (!query || query.trim().length < 2) {
      toast.error('Search term must be at least 2 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('agentToken');
      const response = await axios.get(
        `http://localhost:8000/api/agents/search-users?search=${encodeURIComponent(query.trim())}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { searched_users, all_pending_bookings } = response.data.data;
      setSearchResults(searched_users || []);
      setAllPendingBookings(all_pending_bookings || []);
    } catch (error) {
      console.error('Search error:', error);
      const errorMessage = error.response?.data?.message || 'Search failed. Please try again.';
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('agentToken');
        localStorage.removeItem('agentUser');
        router.push('/agent/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingId) => {
    setConfirmingBookings(prev => new Set(prev).add(bookingId));
    try {
      const token = localStorage.getItem('agentToken');
      await axios.put(
        `http://localhost:8000/api/agents/bookings/${bookingId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Booking confirmed successfully!');
      
      // Refresh the data
      handleSearch();
    } catch (error) {
      console.error('Confirm booking error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to confirm booking. Please try again.';
      toast.error(errorMessage);
    } finally {
      setConfirmingBookings(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookingId);
        return newSet;
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentUser');
    toast.success('Logged out successfully');
    router.push('/agent/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!agentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <FiShield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={styles.headerTitle}>Agent Dashboard</h1>
            <p className={styles.headerSubtitle}>Welcome, {agentUser?.first_name} {agentUser?.last_name}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <div className={styles.main}>
        {/* Search Section */}
        <div className={styles.searchSection}>
          <h2 className={styles.searchTitle}>
            <FiSearch className="h-6 w-6" />
            Search Users
          </h2>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchQuery);
          }} className={styles.searchForm}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone number..."
              className={styles.searchInput}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={styles.searchButton}
            >
              {isLoading ? (
                <>
                  <div className={styles.loadingSpinner}></div>
                  Searching...
                </>
              ) : (
                <>
                  <FiSearch className="h-5 w-5" />
                  Search
                </>
              )}
            </button>
          </form>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search Results */}
          <div>
            <h3>
              Search Results
            </h3>
            
            {searchResults.length === 0 ? (
              <div>
                <FiUsers />
                <p className="text-gray-500">
                  {searchQuery ? 'No users found matching your search.' : 'Enter a name or phone number to search for users.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((user) => (
                  <div key={user.id} className={styles.userCard}>
                    <div className={styles.userInfo}>
                      <div className={styles.userDetails}>
                        <h3>{user.name}</h3>
                        <p>
                          <FiPhone className="inline w-4 h-4 mr-1" />
                          {user.phone}
                        </p>
                      </div>
                    </div>
                    <span className={styles.bookingCount}>
                      {(user.pending_bookings || []).length} Booking{(user.pending_bookings || []).length !== 1 ? 's' : ''}
                    </span>

                    {(user.pending_bookings || []).length > 0 && (
                      <div className="space-y-3">
                        {(user.pending_bookings || []).map((booking) => (
                          <div key={booking.id} className={styles.bookingItem}>
                            <div className={styles.bookingHeader}>
                              <div>
                                <h5 className={styles.bookingTitle}>{booking.listing_title}</h5>
                                <p className={styles.bookingLocation}>
                                  <FiMapPin className="inline w-4 h-4" />
                                  {booking.listing_location}
                                </p>
                              </div>
                              <div className={styles.bookingPrice}>
                                ₪{booking.deposit_amount}
                              </div>
                            </div>
                            
                            <div className={styles.bookingDetails}>
                              <div className={styles.bookingDetail}>
                                <FiCalendar className="w-4 h-4" />
                                <span>{formatDate(booking.start_datetime)}</span>
                              </div>
                              <div className={styles.bookingDetail}>
                                <FiClock className="w-4 h-4" />
                                <span>{booking.status}</span>
                              </div>
                            </div>
                            
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleConfirmBooking(booking.id)}
                                disabled={confirmingBookings.has(booking.id)}
                                className={styles.confirmButton}
                              >
                                {confirmingBookings.has(booking.id) ? (
                                  <>
                                    <div className={styles.loadingSpinner}></div>
                                    Confirming...
                                  </>
                                ) : (
                                  <>
                                    <FiCheck className="w-4 h-4" />
                                    Confirm
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All Pending Bookings */}
          {/* <div className={styles.pendingSection}>
            <h2 className={styles.pendingTitle}>
              <FiClock className="h-6 w-6" />
              All Pending Bookings
              <span className="ml-auto text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                {allPendingBookings.length} Pending
              </span>
            </h2>

            {isLoading ? (
              <div className={styles.loadingText}>
                <div className={styles.loadingSpinner}></div>
                Loading pending bookings...
              </div>
            ) : allPendingBookings.length === 0 ? (
              <div className={styles.emptyState}>
                <FiClock />
                <p>No pending bookings found</p>
              </div>
            ) : (
              <div className={styles.pendingGrid}>
                {allPendingBookings.map((booking) => (
                  <div key={booking.id} className={styles.pendingCard}>
                    <div className={styles.bookingHeader}>
                      <div>
                        <h4 className={styles.bookingTitle}>{booking.listing_title}</h4>
                        <p className={styles.bookingLocation}>
                          <FiMapPin className="inline w-4 h-4" />
                          {booking.listing_location}
                        </p>
                      </div>
                      <div className={styles.bookingPrice}>
                        ${booking.total_price}
                      </div>
                    </div>
                    
                    <div className={styles.bookingDetails}>
                      <div className={styles.bookingDetail}>
                        <FiUser className="w-4 h-4" />
                        <span>Customer: {booking.user_name}</span>
                      </div>
                      <div className={styles.bookingDetail}>
                        <FiPhone className="w-4 h-4" />
                        <span>{booking.user_phone}</span>
                      </div>
                      <div className={styles.bookingDetail}>
                        <FiUser className="w-4 h-4" />
                        <span>Provider: {booking.provider_name}</span>
                      </div>
                      <div className={styles.bookingDetail}>
                        <FiCalendar className="w-4 h-4" />
                        <span>{formatDate(booking.start_datetime)}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleConfirmBooking(booking.id)}
                      disabled={confirmingBookings.has(booking.id)}
                      className={styles.confirmButton}
                    >
                      {confirmingBookings.has(booking.id) ? (
                        <>
                          <div className={styles.loadingSpinner}></div>
                          Confirming...
                        </>
                      ) : (
                        <>
                          <FiCheck className="w-4 h-4" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}