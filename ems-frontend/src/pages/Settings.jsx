import React, { useState } from 'react';
import { Settings as SettingsIcon, Plus, Trash2, Edit } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import ConfirmModal from '../components/ConfirmModal';
import { useAppContext } from '../context/AppContext';

/**
 * Settings Page
 */
const Settings = () => {
  const {
    departments,
    designations,
    holidays,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addDesignation,
    deleteDesignation,
    addHoliday,
    deleteHoliday,
  } = useAppContext();

  const [activeTab, setActiveTab] = useState('departments');
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deptForm, setDeptForm] = useState({ name: '', head: '' });
  const [holidayForm, setHolidayForm] = useState({ name: '', date: '', type: 'National' });
  const [newDesignation, setNewDesignation] = useState('');

  const handleAddDepartment = (e) => {
    e.preventDefault();
    addDepartment({
      id: `DEPT${Date.now()}`,
      name: deptForm.name,
      head: deptForm.head || null,
    });
    setIsDeptModalOpen(false);
    setDeptForm({ name: '', head: '' });
  };

  const handleAddHoliday = (e) => {
    e.preventDefault();
    addHoliday({
      id: `HOL${Date.now()}`,
      name: holidayForm.name,
      date: holidayForm.date,
      type: holidayForm.type,
    });
    setIsHolidayModalOpen(false);
    setHolidayForm({ name: '', date: '', type: 'National' });
  };

  const handleAddDesignation = () => {
    if (newDesignation.trim()) {
      addDesignation(newDesignation.trim());
      setNewDesignation('');
    }
  };

  const tabs = [
    { id: 'departments', label: 'Departments' },
    { id: 'designations', label: 'Designations' },
    { id: 'holidays', label: 'Holidays' },
    { id: 'system', label: 'System Settings' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage system settings and configurations</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Departments */}
      {activeTab === 'departments' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Button onClick={() => setIsDeptModalOpen(true)}>
              <Plus size={16} className="inline mr-2" />
              Add Department
            </Button>
          </div>
          <Table
            columns={[
              { key: 'name', label: 'Department Name' },
              { key: 'head', label: 'Department Head' },
              {
                key: 'actions',
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedItem(row);
                        setDeptForm({ name: row.name, head: row.head || '' });
                        setIsDeptModalOpen(true);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(row);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ),
              },
            ]}
            data={departments}
          />
        </div>
      )}

      {/* Designations */}
      {activeTab === 'designations' && (
        <div>
          <Card title="Designations">
            <div className="mb-4 flex gap-2">
              <Input
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                placeholder="Enter designation name"
                className="flex-1"
              />
              <Button onClick={handleAddDesignation}>Add</Button>
            </div>
            <div className="space-y-2">
              {designations.map((des, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <span className="font-medium">{des}</span>
                  <button
                    onClick={() => {
                      setSelectedItem(des);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Holidays */}
      {activeTab === 'holidays' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Button onClick={() => setIsHolidayModalOpen(true)}>
              <Plus size={16} className="inline mr-2" />
              Add Holiday
            </Button>
          </div>
          <Table
            columns={[
              { key: 'name', label: 'Holiday Name' },
              {
                key: 'date',
                label: 'Date',
                render: (value) => new Date(value).toLocaleDateString(),
              },
              { key: 'type', label: 'Type' },
              {
                key: 'actions',
                label: 'Actions',
                render: (_, row) => (
                  <button
                    onClick={() => {
                      setSelectedItem(row);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                ),
              },
            ]}
            data={holidays}
          />
        </div>
      )}

      {/* System Settings */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <Card title="Email Configuration">
            <div className="space-y-4">
              <Input label="SMTP Host" placeholder="smtp.example.com" />
              <Input label="SMTP Port" type="number" placeholder="587" />
              <Input label="Email" type="email" placeholder="noreply@company.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Button>Save Email Settings</Button>
            </div>
          </Card>

          <Card title="SMS Configuration">
            <div className="space-y-4">
              <Input label="SMS Provider" placeholder="Twilio / AWS SNS" />
              <Input label="API Key" placeholder="••••••••" />
              <Input label="API Secret" type="password" placeholder="••••••••" />
              <Button>Save SMS Settings</Button>
            </div>
          </Card>

          <Card title="Backup & Restore">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Export all data as JSON or import from a backup file.
              </p>
              <div className="flex gap-3">
                <Button variant="secondary">
                  <Download size={16} className="inline mr-2" />
                  Export Data
                </Button>
                <Button variant="secondary">
                  <SettingsIcon size={16} className="inline mr-2" />
                  Import Data
                </Button>
              </div>
            </div>
          </Card>

          <Card title="System Logs">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                System logs and audit trail would appear here. This requires backend integration.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Add Department Modal */}
      <Modal
        isOpen={isDeptModalOpen}
        onClose={() => {
          setIsDeptModalOpen(false);
          setSelectedItem(null);
          setDeptForm({ name: '', head: '' });
        }}
        title={selectedItem ? 'Edit Department' : 'Add Department'}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeptModalOpen(false);
                setSelectedItem(null);
                setDeptForm({ name: '', head: '' });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddDepartment}>Save</Button>
          </>
        }
      >
        <form onSubmit={handleAddDepartment} className="space-y-4">
          <Input
            label="Department Name"
            value={deptForm.name}
            onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
            required
          />
          <Input
            label="Department Head (Optional)"
            value={deptForm.head}
            onChange={(e) => setDeptForm({ ...deptForm, head: e.target.value })}
          />
        </form>
      </Modal>

      {/* Add Holiday Modal */}
      <Modal
        isOpen={isHolidayModalOpen}
        onClose={() => setIsHolidayModalOpen(false)}
        title="Add Holiday"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsHolidayModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddHoliday}>Add</Button>
          </>
        }
      >
        <form onSubmit={handleAddHoliday} className="space-y-4">
          <Input
            label="Holiday Name"
            value={holidayForm.name}
            onChange={(e) => setHolidayForm({ ...holidayForm, name: e.target.value })}
            required
          />
          <Input
            label="Date"
            type="date"
            value={holidayForm.date}
            onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })}
            required
          />
          <select
            value={holidayForm.type}
            onChange={(e) => setHolidayForm({ ...holidayForm, type: e.target.value })}
            className="input"
          >
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="Company">Company</option>
          </select>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={() => {
          if (activeTab === 'departments' && selectedItem?.id) {
            deleteDepartment(selectedItem.id);
          } else if (activeTab === 'designations' && selectedItem) {
            deleteDesignation(selectedItem);
          } else if (activeTab === 'holidays' && selectedItem?.id) {
            deleteHoliday(selectedItem.id);
          }
          setIsDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this item?"
        variant="danger"
      />
    </div>
  );
};

export default Settings;

