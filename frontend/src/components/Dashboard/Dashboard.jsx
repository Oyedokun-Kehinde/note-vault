import { useEffect } from 'react';
import { BarChart3, FileText, Archive, Trash2, Star, Pin } from 'lucide-react';
import useNoteStore from '../../store/useNoteStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];

export default function Dashboard() {
  const { stats, fetchStats } = useNoteStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!stats) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading stats...</div>
      </div>
    );
  }

  const { overall = {}, byCategory = [] } = stats;

  const statsCards = [
    { 
      icon: <FileText />, 
      label: 'Total Notes', 
      value: overall.total || 0, 
      color: '#667eea' 
    },
    { 
      icon: <Star />, 
      label: 'Favorites', 
      value: overall.favorites || 0, 
      color: '#f093fb' 
    },
    { 
      icon: <Pin />, 
      label: 'Pinned', 
      value: overall.pinned || 0, 
      color: '#4facfe' 
    },
    { 
      icon: <Archive />, 
      label: 'Archived', 
      value: overall.archived || 0, 
      color: '#43e97b' 
    },
    { 
      icon: <Trash2 />, 
      label: 'Deleted', 
      value: overall.deleted || 0, 
      color: '#f66d9b' 
    }
  ];

  const categoryData = byCategory.map(cat => ({
    name: cat._id,
    count: cat.count
  }));

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard & Analytics</h2>

      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {categoryData.length > 0 && (
        <div className="charts-container">
          <div className="chart-card">
            <h3>Notes by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
