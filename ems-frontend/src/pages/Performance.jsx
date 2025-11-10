import React, { useState } from 'react';
import { TrendingUp, Plus, Star } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAppContext } from '../context/AppContext';

/**
 * Performance Management Page
 */
const Performance = () => {
  const { employees, performanceReviews, addPerformanceReview } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    reviewPeriod: '',
    rating: '',
    goals: '',
    feedback: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = employees.find((e) => e.id === formData.employeeId);
    
    addPerformanceReview({
      id: `PERF${Date.now()}`,
      employeeId: formData.employeeId,
      employeeName: employee?.name || '',
      reviewPeriod: formData.reviewPeriod,
      rating: parseFloat(formData.rating),
      goals: formData.goals.split('\n').filter((g) => g.trim()),
      feedback: formData.feedback,
      reviewedBy: 'Manager', // TODO: Get from current user
      reviewDate: new Date().toISOString().split('T')[0],
    });

    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      reviewPeriod: '',
      rating: '',
      goals: '',
      feedback: '',
    });
  };

  const columns = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'reviewPeriod', label: 'Review Period' },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="font-medium">{value} / 5.0</span>
        </div>
      ),
    },
    {
      key: 'feedback',
      label: 'Feedback',
      render: (value) => <span className="text-sm">{value.substring(0, 50)}...</span>,
    },
    {
      key: 'reviewDate',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const averageRating =
    performanceReviews.reduce((sum, r) => sum + r.rating, 0) / performanceReviews.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600 mt-1">Track and review employee performance</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="inline mr-2" />
          Add Review
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{performanceReviews.length}</p>
            </div>
            <TrendingUp className="text-primary-600" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <Star className="text-yellow-400 fill-current" size={24} />
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Employees Reviewed</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(performanceReviews.map((r) => r.employeeId)).size}
            </p>
          </div>
        </Card>
      </div>

      {/* Reviews Table */}
      <Table columns={columns} data={performanceReviews} />

      {/* Add Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Performance Review"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Review</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="input"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.designation}
              </option>
            ))}
          </select>
          <Input
            label="Review Period"
            value={formData.reviewPeriod}
            onChange={(e) => setFormData({ ...formData, reviewPeriod: e.target.value })}
            placeholder="e.g., Q4 2023"
            required
          />
          <Input
            label="Rating (1-5)"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goals (one per line)
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              className="input"
              rows={4}
              placeholder="Goal 1&#10;Goal 2&#10;Goal 3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className="input"
              rows={4}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Performance;

