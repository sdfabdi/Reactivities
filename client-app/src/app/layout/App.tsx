import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selecedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    Axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id : String){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancleSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id ? : string){
    id ? handleSelectActivity(id) : handleCancleSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity : Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id : uuid()}]);
    setEditMode (false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id : string){
    setActivities({...activities.filter(x => x.id !== id)});
  }


  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style = {{marginTop : '7em'}}>
        <ActivityDashboard activities = {activities} selectedActivity={selecedActivity} 
        selectActivity={handleSelectActivity} cancleSelectActivity={handleCancleSelectActivity}
        editMode={editMode} openForm={handleFormOpen} closeForm={handleFormClose}  
        createOrEdit = {handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        />
      </Container>
      
    </>
  );
}

export default App;
