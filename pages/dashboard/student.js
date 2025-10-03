import LeftPanel from '../../components/LeftPanel';
import MealCancellation from '../../components/MealCancellation';
import { supabase } from '../../utils/supabaseClient';

const StudentDashboard = ({ user, mealDetails }) => {
  return (
    <div className="dashboard">
      <LeftPanel userName={user.full_name} mealDetails={mealDetails} />
      <div className="main-content">
        <MealCancellation mealDetails={mealDetails} />
      </div>
    </div>
  );
};

// Fetch user and menu data
export async function getServerSideProps() {
  const user = supabase.auth.user();
  const { data: mealDetails, error } = await supabase
    .from('menus')
    .select('*')
    .eq('meal_time', 'Breakfast')  // Change dynamically based on the time
    .single();

  return {
    props: {
      user,
      mealDetails,
    },
  };
}

export default StudentDashboard;

