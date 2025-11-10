import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

/**
 * My Performance Page - Employee Self-Service
 * Employees can view their own performance reviews
 */
const MyPerformance = () => {
  const navigate = useNavigate();
  const { currentUser, performanceReviews } = useAppContext();

  // Filter performance reviews for current user
  const myReviews = performanceReviews.filter(
    (r) => r.employeeId === currentUser?.id || r.employeeEmail === currentUser?.email
  );

  // Calculate average rating
  const averageRating =
    myReviews.length > 0
      ? myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Performance</h1>
          <p className="text-gray-600 mt-1">View your performance reviews and ratings</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{myReviews.length}</p>
            </div>
            <TrendingUp className="text-primary-600" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="text-yellow-400 fill-current" size={28} />
              <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              <span className="text-gray-500">/ 5.0</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Latest Review</p>
            <p className="text-lg font-semibold text-gray-900 mt-2">
              {myReviews.length > 0
                ? myReviews[0].reviewPeriod
                : 'No reviews yet'}
            </p>
          </div>
        </Card>
      </div>

      {/* Performance Reviews */}
      {myReviews.length > 0 ? (
        <div className="space-y-4">
          {myReviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{review.reviewPeriod}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Reviewed by {review.reviewedBy} on{' '}
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current" size={24} />
                  <span className="text-2xl font-bold text-gray-900">{review.rating}</span>
                  <span className="text-gray-500">/ 5.0</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Feedback:</p>
                <p className="text-gray-600">{review.feedback}</p>
              </div>

              {review.goals && review.goals.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Goals:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {review.goals.map((goal, idx) => (
                      <li key={idx} className="text-gray-600">
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Star className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500 text-lg mb-2">No performance reviews yet</p>
          <p className="text-gray-400 text-sm">
            Your performance reviews will appear here once they are completed by your manager.
          </p>
        </Card>
      )}
    </div>
  );
};

export default MyPerformance;

