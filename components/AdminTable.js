
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AdminTable = () => {
  const [cancellations, setCancellations] = useState([]);

  useEffect(() => {
    const fetchCancellations = async () => {
      const { data, error } = await supabase
        .from('cancellations')
        .select('*, users(full_name)')
        .eq('status', 'Pending');

      if (error) {
        console.error('Error fetching cancellations:', error);
      } else {
        setCancellations(data);
      }
    };

    fetchCancellations();
  }, []);

  const handleApproval = async (id) => {
    const { error } = await supabase
      .from('cancellations')
      .update({ status: 'Approved' })
      .eq('id', id);

    if (error) {
      console.error('Error approving cancellation:', error);
    }
  };

  const handleRejection = async (id) => {
    const { error } = await supabase
      .from('cancellations')
      .update({ status: 'Rejected' })
      .eq('id', id);

    if (error) {
      console.error('Error rejecting cancellation:', error);
    }
  };

  return (
    <div>
      <h1>Cancellation Management</h1>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Meal Date/Time</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cancellations.map((cancellation) => (
            <tr key={cancellation.id}>
              <td>{cancellation.users.full_name}</td>
              <td>{new Date(cancellation.meal_date).toLocaleString()}</td>
              <td>{new Date(cancellation.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleApproval(cancellation.id)}>Approve</button>
                <button onClick={() => handleRejection(cancellation.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
