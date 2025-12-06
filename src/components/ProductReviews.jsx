// src/components/ProductReviews.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';

export default function ProductReviews({ productId }) {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]); // ✅ Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/reviews/product/${productId}`);
      
      if (!response.ok) {
        console.error('Failed to fetch reviews:', response.status);
        setReviews([]); // ✅ Set empty array on error
        return;
      }
      
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []); // ✅ Ensure it's always an array
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]); // ✅ Set empty array on error
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
        ? `http://localhost:5000/api/reviews/${editingReview._id}`
        : 'http://localhost:5000/api/reviews';
      
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
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
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

  const renderStars = (count, interactive = false, size = 'text-xl') => {
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
            <FaStar className={`${size} text-yellow-500`} />
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
      <div className="py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header with Average Rating */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex">{renderStars(Math.round(calculateAverageRating()))}</div>
              <span className="text-lg font-semibold">{calculateAverageRating()}</span>
              <span className="text-gray-600">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
            </div>
          )}
        </div>

        {user && !userHasReviewed && !showAddReview && (
          <button
            onClick={() => setShowAddReview(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Add/Edit Review Section */}
      {showAddReview && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-bold mb-4">
            {editingReview ? 'Edit Your Review' : 'Write a Review'}
          </h3>
          
          <div>
            {/* Star Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              <div className="flex gap-1">
                {renderStars(rating, true)}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Share your experience with this product..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum 10 characters ({comment.length}/10)
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmitReview}
                disabled={submitting}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {review.userName || review.userId?.name || 'Anonymous'}
                    </span>
                    <div className="flex">{renderStars(review.rating, false, 'text-base')}</div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Edit/Delete buttons for own review */}
                {user && (review.userId?._id === user._id || review.userId === user._id) && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-600 hover:text-blue-700 p-2"
                      title="Edit review"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Delete review"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}