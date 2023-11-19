import React from 'react';
import { Activity } from '../../../app/models/activity';
import { Button, Card, Image} from 'semantic-ui-react';

interface Props{
    activity : Activity;
    cancleSelectActivity : () => void;
    openForm : (id : string) => void;
}

export default function ActivityDetails({activity, cancleSelectActivity, openForm} : Props){
    return(
      <Card fluid>
        <Image src = {`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>{activity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group width = '2'>
                <Button onClick={() => {openForm(activity.id)}} basic color = 'blue' content = 'Edit' />
                <Button onClick={cancleSelectActivity} basic color = 'grey' content = 'cancel' />
            </Button.Group>
        </Card.Content>
      </Card>  
    )
}