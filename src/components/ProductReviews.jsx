// src/components/ProductReviews.jsx - COMPACT VERSION
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';

export default function ProductReviews({ productId }) {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/reviews/product/${productId}`);
      
      if (!response.ok) {
        console.error('Failed to fetch reviews:', response.status);
        setReviews([]);
        return;
      }
      
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      setError('Please sign in to leave a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const url = editingReview 
        ? `${API_URL}/api/reviews/${editingReview._id}`
        : `${API_URL}/api/reviews`;
      
      const method = editingReview ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          rating,
          comment
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review');
      }

      await fetchReviews();
      setRating(0);
      setComment('');
      setShowAddReview(false);
      setEditingReview(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setRating(review.rating);
    setComment(review.comment);
    setShowAddReview(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      await fetchReviews();
    } catch (error) {
      setError(error.message);
    }
  };

  const calculateAverageRating = () => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (count, interactive = false, size = 'text-base') => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      const isFilled = interactive 
        ? starValue <= (hoverRating || rating)
        : starValue <= count;

      return (
        <button
          key={index}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && setRating(starValue)}
          onMouseEnter={() => interactive && setHoverRating(starValue)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          {isFilled ? (
            <FaStar className={`${size} text-yellow-400`} />
          ) : (
            <FaRegStar className={`${size} text-gray-300`} />
          )}
        </button>
      );
    });
  };

  const userHasReviewed = Array.isArray(reviews) && reviews.some(review => 
    review.userId?._id === user?._id || review.userId === user?._id
  );

  if (loading) {
    return (
      <div className="py-6">
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Header with Average Rating */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1.5">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(Math.round(calculateAverageRating()), false, 'text-sm')}</div>
              <span className="text-base font-semibold">{calculateAverageRating()}</span>
              <span className="text-sm text-gray-600">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
            </div>
          )}
        </div>

        {user && !userHasReviewed && !showAddReview && (
          <button
            onClick={() => setShowAddReview(true)}
            className="bg-orange-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Add/Edit Review Section */}
      {showAddReview && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <h3 className="text-base font-bold mb-3">
            {editingReview ? 'Edit Your Review' : 'Write a Review'}
          </h3>
          
          <div>
            {/* Star Rating */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Rating *
              </label>
              <div className="flex gap-1">
                {renderStars(rating, true, 'text-lg')}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Review *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Share your experience with this product..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 10 characters ({comment.length}/10)
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-3 text-sm">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSubmitReview}
                disabled={submitting}
                className="bg-orange-500 text-white px-5 py-2 text-sm rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
              </button>
              <button
                onClick={() => {
                  setShowAddReview(false);
                  setEditingReview(null);
                  setRating(0);
                  setComment('');
                  setError('');
                }}
                className="bg-gray-200 text-gray-700 px-5 py-2 text-sm rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-base">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-semibold text-gray-900 text-sm">
                      {review.userName || review.userId?.name || 'Anonymous'}
                    </span>
                    <div className="flex">{renderStars(review.rating, false, 'text-xs')}</div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Edit/Delete buttons for own review */}
                {user && (review.userId?._id === user._id || review.userId === user._id) && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-600 hover:text-blue-700 p-1.5"
                      title="Edit review"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-700 p-1.5"
                      title="Delete review"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}