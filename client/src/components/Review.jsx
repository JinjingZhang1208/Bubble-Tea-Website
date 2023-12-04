import React, { useState } from 'react';

const Review = ({ isAuthenticated }) => {
  const [review, setReview] = useState('');

  const handleReviewSubmit = () => {
    console.log('Review Submitted:', review);
  };

  const handleCommentSubmit = () => {
    console.log('Comment Submitted:', review);
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <br />
      {isAuthenticated ? (
        <>
          <button onClick={handleReviewSubmit}>Submit Review</button>
          <h2>Leave a Comment</h2>
          <textarea
            rows="4"
            cols="50"
            placeholder="Write your comment here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <br />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </>
      ) : (
        <button onClick={handleReviewSubmit}>Submit as Anonymous</button>
      )}
    </div>
  );
};

export default Review;
