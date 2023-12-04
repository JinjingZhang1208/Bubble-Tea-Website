import React, { useState } from 'react';

const Review = ({ isAuthenticated }) => {
  const [review, setReview] = useState('');

  const handleReviewSubmit = () => {
    // Logic to submit the review
    console.log('Review Submitted:', review);
    // You can send the review to the server here
  };

  const handleCommentSubmit = () => {
    // Logic to submit the comment
    console.log('Comment Submitted:', review);
    // You can send the comment to the server here
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
