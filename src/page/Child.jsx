import Signup from './Signup';
import Notes from './Notes';

export default function Child(props) {
   console.log(props.email); // Check the value in the console

  return (
    <div>
      Child component received input value: {props.email}
    </div>
  );
}

