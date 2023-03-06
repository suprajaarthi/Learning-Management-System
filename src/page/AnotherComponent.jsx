
import Signup from './Signup';
import Notes from './Notes';

export default function AnotherComponent(props) {

  return (
    <div>
      Another component received input value: {props.email}
    </div>
  );
}
