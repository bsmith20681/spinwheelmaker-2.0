import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubHeaderItem = (props) => {
  return (
    <div className="ml-3 flex items-center justify-center rounded-md py-1 px-2 transition duration-150 hover:cursor-pointer hover:bg-gray-100 hover:ease-in" onClick={props.onClick}>
      <FontAwesomeIcon className="text-gray-600" icon={props.icon} />
      <p className="ml-3 text-xl text-gray-600">{props.action}</p>
    </div>
  );
};

export default SubHeaderItem;
