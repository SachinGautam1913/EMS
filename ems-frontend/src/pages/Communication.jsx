import React, { useState } from 'react';
import { MessageSquare, Send, Plus, Bell } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAppContext } from '../context/AppContext';

/**
 * Communication & Notifications Page
 */
const Communication = () => {
  const { announcements, messages, employees, addAnnouncement, sendMessage } = useAppContext();
  const [activeTab, setActiveTab] = useState('announcements');
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({ title: '', message: '' });
  const [messageForm, setMessageForm] = useState({ to: '', subject: '', message: '' });

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    addAnnouncement({
      id: `ANN${Date.now()}`,
      title: announcementForm.title,
      message: announcementForm.message,
      author: 'Admin', // TODO: Get from current user
      createdAt: new Date().toISOString(),
    });
    setIsAnnouncementModalOpen(false);
    setAnnouncementForm({ title: '', message: '' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const toEmployee = employees.find((e) => e.id === messageForm.to);
    sendMessage({
      id: `MSG${Date.now()}`,
      from: 'USER001', // TODO: Get from current user
      fromName: 'Current User',
      to: messageForm.to,
      toName: toEmployee?.name || '',
      subject: messageForm.subject,
      message: messageForm.message,
      timestamp: new Date().toISOString(),
      read: false,
    });
    setIsMessageModalOpen(false);
    setMessageForm({ to: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
        <p className="text-gray-600 mt-1">Announcements and internal messaging</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'announcements', label: 'Announcements' },
            { id: 'messages', label: 'Messages' },
          ].map((tab) => (
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

      {/* Announcements */}
      {activeTab === 'announcements' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Button onClick={() => setIsAnnouncementModalOpen(true)}>
              <Plus size={16} className="inline mr-2" />
              New Announcement
            </Button>
          </div>
          <div className="space-y-4">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <Card key={announcement.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{announcement.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {announcement.author}</span>
                        <span>
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Bell className="text-primary-600" size={24} />
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No announcements yet</p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      {activeTab === 'messages' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Button onClick={() => setIsMessageModalOpen(true)}>
              <Plus size={16} className="inline mr-2" />
              New Message
            </Button>
          </div>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <Card key={msg.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{msg.subject}</h3>
                        {!msg.read && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{msg.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>From: {msg.fromName}</span>
                        <span>To: {msg.toName}</span>
                        <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <MessageSquare className="text-primary-600" size={24} />
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No messages yet</p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      <Modal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        title="New Announcement"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAnnouncementModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAnnouncement}>Publish</Button>
          </>
        }
      >
        <form onSubmit={handleAddAnnouncement} className="space-y-4">
          <Input
            label="Title"
            value={announcementForm.title}
            onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={announcementForm.message}
              onChange={(e) =>
                setAnnouncementForm({ ...announcementForm, message: e.target.value })
              }
              className="input"
              rows={6}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Send Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title="New Message"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsMessageModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              <Send size={16} className="inline mr-2" />
              Send
            </Button>
          </>
        }
      >
        <form onSubmit={handleSendMessage} className="space-y-4">
          <select
            value={messageForm.to}
            onChange={(e) => setMessageForm({ ...messageForm, to: e.target.value })}
            className="input"
            required
          >
            <option value="">Select Recipient</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.email}
              </option>
            ))}
          </select>
          <Input
            label="Subject"
            value={messageForm.subject}
            onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={messageForm.message}
              onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
              className="input"
              rows={6}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Communication;

