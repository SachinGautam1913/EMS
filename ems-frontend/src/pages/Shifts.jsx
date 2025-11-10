import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import ConfirmModal from '../components/ConfirmModal';
import { useAppContext } from '../context/AppContext';

/**
 * Shifts & Scheduling Page
 */
const Shifts = () => {
  const { shifts, employees, addShift, updateShift, deleteShift } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    breakDuration: '',
  });

  const handleAdd = () => {
    setFormData({ name: '', startTime: '', endTime: '', breakDuration: '' });
    setSelectedShift(null);
    setIsModalOpen(true);
  };

  const handleEdit = (shift) => {
    setSelectedShift(shift);
    setFormData({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      breakDuration: shift.breakDuration.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (shift) => {
    setSelectedShift(shift);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftData = {
      ...formData,
      breakDuration: parseInt(formData.breakDuration),
    };

    if (selectedShift) {
      updateShift(selectedShift.id, shiftData);
    } else {
      addShift({
        id: `SHIFT${Date.now()}`,
        ...shiftData,
      });
    }

    setIsModalOpen(false);
    setSelectedShift(null);
    setFormData({ name: '', startTime: '', endTime: '', breakDuration: '' });
  };

  const columns = [
    { key: 'name', label: 'Shift Name' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    {
      key: 'breakDuration',
      label: 'Break (minutes)',
      render: (value) => `${value} min`,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shifts & Scheduling</h1>
          <p className="text-gray-600 mt-1">Manage work shifts and employee schedules</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={16} className="inline mr-2" />
          Add Shift
        </Button>
      </div>

      {/* Shifts Table */}
      <Card title="Shift Definitions">
        <Table columns={columns} data={shifts} />
      </Card>

      {/* Schedule View Placeholder */}
      <Card title="Weekly Schedule">
        <p className="text-gray-500 text-center py-8">
          Schedule assignment UI coming soon. This would show employee shift assignments for the week.
        </p>
      </Card>

      {/* Add/Edit Shift Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedShift ? 'Edit Shift' : 'Add Shift'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Shift Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
          <Input
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
          <Input
            label="Break Duration (minutes)"
            type="number"
            value={formData.breakDuration}
            onChange={(e) => setFormData({ ...formData, breakDuration: e.target.value })}
            required
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (selectedShift) {
            deleteShift(selectedShift.id);
            setIsDeleteModalOpen(false);
            setSelectedShift(null);
          }
        }}
        title="Delete Shift"
        message={`Are you sure you want to delete ${selectedShift?.name}?`}
        variant="danger"
      />
    </div>
  );
};

export default Shifts;

