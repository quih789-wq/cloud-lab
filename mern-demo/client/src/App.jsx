import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', studentId: '', email: '', major: '' });

  // Lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Thêm sinh viên mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/students', form);
      setForm({ name: '', studentId: '', email: '', major: '' });
      fetchStudents();
    } catch (err) {
      alert('Lỗi thêm sinh viên: ' + (err.response?.data?.message || err.message));
    }
  };

  // Xóa sinh viên
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      try {
        await axios.delete(`/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error("Lỗi xóa sinh viên:", err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Quản Lý Sinh Viên (MERN Stack)</h2>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Họ và tên" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          required 
        /> {' '}
        <input 
          placeholder="Mã SV" 
          value={form.studentId} 
          onChange={(e) => setForm({ ...form, studentId: e.target.value })} 
          required 
        /> {' '}
        <input 
          placeholder="Email" 
          value={form.email} 
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
          required 
        /> {' '}
        <input 
          placeholder="Ngành học" 
          value={form.major} 
          onChange={(e) => setForm({ ...form, major: e.target.value })} 
          required 
        /> {' '}
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      {/* Bảng danh sách sinh viên */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Ngành</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv) => (
            <tr key={sv._id}>
              <td>{sv.studentId}</td>
              <td>{sv.name}</td>
              <td>{sv.email}</td>
              <td>{sv.major}</td>
              <td>
                <button onClick={() => handleDelete(sv._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;