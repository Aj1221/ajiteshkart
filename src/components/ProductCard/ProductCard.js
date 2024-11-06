import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import { FaStar,FaTimes } from 'react-icons/fa';
import "./ProductCard.css";
import 'react-toastify/dist/ReactToastify.css'; 


const ProductCard = ({ product, addToCart }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`"${product.title}" is added to the cart successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewsRef = collection(db, `products/${product.id}/reviews`);
      await addDoc(reviewsRef, {
        rating,
        comment,
        timestamp: new Date(),
      });
      toast.success('Review added successfully!');
      setRating(0);
      setComment('');
      setIsReviewFormOpen(false); 
    } catch (error) {
      toast.error('Failed to add review. Try again later.');
      console.error('Error adding review:', error);
    }
  };

  useEffect(() => {
    const reviewsRef = collection(db, `products/${product.id}/reviews`);
    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [product.id]);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
        <ToastContainer />

        <p className="write-review-text" onClick={() => setIsReviewFormOpen(true)}>
          Write a Review  <FaStar  size={16} color="#ffc107" />
        </p>

        {isReviewFormOpen && (
          <div className="review-form-modal">
            <div className="formdiv">
              <FaTimes
                className="close-icon"
                onClick={() => setIsReviewFormOpen(false)}
              />
        
              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="rating-input">
                  <label>Rating:</label>
                  <div className="stars">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <FaStar
                          key={index}
                          className="star"
                          size={24}
                          color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHover(starValue)}
                          onMouseLeave={() => setHover(rating)}
                        />
                      );
                    })}
                  </div>
                </div>
                <label>
                  Comment:
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </label>
                <button className="submit-review-button">Submit Review</button>
              </form>
            </div>
          </div>
        )}

        <div className="reviews-section">
          {reviews.length > 0 ? (
            <p className="reviewPara">Reviews of this Product</p>
          ) : (
            <p className="reviewPara">No Reviews Yet for this Product!</p>
          )}
          {reviews.slice(-2).map((review) => (
            <div key={review.id} className="review">
              <p><strong>Rating:</strong> {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} size={16} color="#ffc107" />
              ))}</p>
              <p>Review - {review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
