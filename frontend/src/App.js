import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// CẤU HÌNH GỐC: Ép toàn bộ ứng dụng gọi API tới Backend trên Render
axios.defaults.baseURL = 'https://api-237411.onrender.com';

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    employeeId: '', fullName: '', gender: 'Nam', dateOfBirth: '',
    department: '', position: '', email: '', phone: '', hireDate: '', status: 'Đang làm việc'
  });
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    try {
      // Chỉ cần gọi /api/..., axios sẽ tự động nối với baseURL ở trên
      const res = await axios.get(`/api/employees?search=${search}`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/employees/${editingId}`, form);
      } else {
        await axios.post('/api/employees', form);
      }
      setForm({
        employeeId: '', fullName: '', gender: 'Nam', dateOfBirth: '',
        department: '', position: '', email: '', phone: '', hireDate: '', status: 'Đang làm việc'
      });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      alert('Lỗi: Kiểm tra lại dữ liệu hoặc Mã NV bị trùng!');
    }
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>QUẢN LÝ NHÂN SỰ - TRẦN NGỌC TUẤN KHANG (237411)</h2>
      
      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h3>{editingId ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}</h3>
        <input placeholder="Mã NV (VD: NV01)" value={form.employeeId} onChange={e => setForm({...form, employeeId: e.target.value})} required style={{marginRight: '10px', marginBottom: '10px'}} />
        <input placeholder="Họ tên" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required style={{marginRight: '10px', marginBottom: '10px'}} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{marginRight: '10px', marginBottom: '10px'}} />
        <input placeholder="Số điện thoại" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{marginRight: '10px', marginBottom: '10px'}} />
        <input placeholder="Phòng ban" value={form.department} onChange={e => setForm({...form, department: e.target.value})} style={{marginRight: '10px', marginBottom: '10px'}} />
        <input placeholder="Chức vụ" value={form.position} onChange={e => setForm({...form, position: e.target.value})} style={{marginRight: '10px', marginBottom: '10px'}} />
        <input placeholder="Trạng thái làm việc" value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={{marginRight: '10px', marginBottom: '10px'}} />
        <br/>
        <button type="submit" style={{ background: 'green', color: 'white', padding: '8px 15px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
          {editingId ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({employeeId: '', fullName: '', gender: 'Nam', dateOfBirth: '', department: '', position: '', email: '', phone: '', hireDate: '', status: 'Đang làm việc'}); }} style={{marginLeft: '10px', padding: '8px 15px', marginTop: '10px'}}>Hủy</button>}
      </form>

      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Tìm kiếm theo Mã hoặc Tên..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '300px', padding: '8px' }} />
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#ddd' }}>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Phòng ban</th>
            <th>Chức vụ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>{emp.status}</td>
              <td>
                <button onClick={() => handleEdit(emp)} style={{ marginRight: '5px', background: 'orange', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(emp._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;